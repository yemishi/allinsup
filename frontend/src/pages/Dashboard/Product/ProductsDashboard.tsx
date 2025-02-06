import useScrollQuery from "../../../hooks/useInfiniteQuery";
import {
  ProductFormType,
  ProductType,
  VariantType,
} from "../../../types/response";
import Button from "../../../components/ui/Button,";
import { useTempOverlay } from "../../../context/Provider";
import ProductForm from "../../../components/form/product/ProductForm";
import axiosRequest from "../../../services/axios.config";
import { motion } from "framer-motion";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { enableScroll, productDetails } from "../../../utils/helpers";
import { toast } from "react-toastify";
import { DivDraggable } from "../../../components";

interface VariantData extends Omit<VariantType, "photos"> {
  photos: [];
  photosData: string[];
}
type ProductEditType = Omit<ProductType, "variants"> & {
  variants: VariantData[];
};

export default function ProductsDashboard() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") as string;

  const { setChildren, close } = useTempOverlay();
  const closePopUp = () => {
    enableScroll(), close();
  };
  const {
    values: products,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    ref,
    refetch,
  } = useScrollQuery<ProductType>({
    queryKey: ["dashboard-products", query],
    url: `/product?query=${query || ""}`,
  });
  if (isLoading)
    return (
      <img src="/loading.svg" className="self-center" alt="loading icon" />
    );

  const deleteProduct = async (productId: string) => {
    const fetchData = async () => {
      const { error, message } = await axiosRequest.product.delete(productId);
      if (error) return toast.error(message);
      toast.success(message), refetch(), closePopUp();
    };
    setChildren(<DeleteProduct fetchData={fetchData} close={close} />);
  };

  const newProduct = () => {
    const fetchData = async (values: ProductFormType) => {
      await updatedVariantsPhotos(values);
      const { error, message } = await axiosRequest.product.create(
        values as any
      );
      if (error) {
        toast.error(message);
        return;
      }
      toast.success(message), closePopUp(), refetch();
    };
    setChildren(
      <DivDraggable maxMd initialDirection="100%" closeParent={closePopUp}>
        <ProductForm action={fetchData} onClose={closePopUp} />
      </DivDraggable>
    );
  };
  const editProduct = (product: ProductEditType, productId: string) => {
    const fetchData = async (
      form: ProductFormType,
      photosDelete?: string[]
    ) => {
      const variants = await updatedVariantsPhotos(form, photosDelete);
      form.variants = variants as any;
      const updatedForm = {
        ...form,
        variants,
      };

      const { error, message } = await axiosRequest.product.edit(
        updatedForm as any,
        productId,
        photosDelete && photosDelete.length > 0 ? photosDelete : undefined
      );
      if (error) {
        toast.error(message);
        return;
      }
      toast.success(message), close(), refetch();
    };
    setChildren(
      <DivDraggable maxMd initialDirection="100%" closeParent={close}>
        <ProductForm
          action={fetchData}
          onClose={closePopUp}
          defaultValues={product}
        />
      </DivDraggable>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:w-[80%] self-center">
      <Button
        onClick={newProduct}
        type="button"
        className="py-2 px-4 my-2 rounded-full bg-primary-400 border self-end "
      >
        +
      </Button>
      <div className="flex flex-wrap text-gray-200 gap-4 items-center justify-center">
        {products.map((product) => {
          const { coverPhoto, name } = productDetails(product);
          const variantsClean = product.variants.map((v) => ({
            ...v,
            photosData: v.photos,
            photos: [],
          })) as VariantData[];
          const productEdit = {
            ...product,
            variants: variantsClean,
          };

          return (
            <div
              className="flex flex-col gap-3 w-full max-w-[250px] border border-primary-200 p-2 max-w-44  h-72 md:h-80 overflow-hidden min-w-[170px] bg-primary-550 rounded-lg md:min-w-[195px] md:max-w-[270px]"
              key={`${product._id}_${name}`}
            >
              <div className=" h-40 md:h-48 flex p-2 bg-white rounded-lg">
                <img
                  src={coverPhoto}
                  className="w-full object-contain"
                  alt=""
                />
              </div>
              <div className="w-full pl-2 pr-1">
                <span className="font-lato font-semibold text-sm md:text-lg">
                  {name}
                </span>
              </div>

              <span className="mt-auto grid grid-cols-2 gap-2">
                <Button
                  onClick={() => deleteProduct(product._id)}
                  className="mt-auto p-1 rounded-lg font-lato font-bold "
                >
                  Delete
                </Button>
                <Button
                  onClick={() => editProduct(productEdit, product._id)}
                  className="mt-auto bg-secondary-600 p-1 rounded-lg font-lato font-bold"
                >
                  Update
                </Button>
              </span>
            </div>
          );
        })}

        {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
      </div>
    </div>
  );
}

const DeleteProduct = ({
  fetchData,
  close,
}: {
  fetchData: () => void;
  close: () => void;
}) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ type: "just" }}
      className="p-6 pb-4 rounded-lg bg-primary-500 flex flex-col gap-14"
    >
      <span className="text-xl font-bold">
        You really want delete this product?
      </span>
      <div className="grid grid-cols-2 gap-2">
        <Button className="py-2 bg-primary" onClick={close}>
          No
        </Button>
        <Button onClick={fetchData} className="py-2">
          Yes!
        </Button>
      </div>
    </motion.div>
  );
};

const updatedVariantsPhotos = async (
  form: ProductFormType,
  photosDelete?: string[]
) => {
  const variants = await Promise.all(
    form.variants.flatMap(async (variant) => {
      const formData = new FormData();

      variant.photos.forEach((photo) => formData.append(`files[]`, photo[0]));
      const response = await axios
        .post(`${import.meta.env.VITE_API_URL}/uploadImage/many`, formData)
        .then((res) => res.data);
      if (response.error) return toast.error(response.message);
      const photosDataUrl = variant.photosData &&
        variant.photosData.length > 0 && [...variant.photosData];
      variant.photos = [];
      if (photosDataUrl) {
        const urls =
          photosDelete && photosDelete?.length > 0
            ? [...photosDataUrl.filter((i) => !photosDelete.includes(i))]
            : [...photosDataUrl];
        variant.photos = urls as any;
      }
      variant.photos = [...variant.photos, ...response.urls];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { photosData, ...rest } = variant;
      variant = rest;
      return variant;
    })
  );
  return variants;
};
