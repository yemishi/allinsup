import { ReactNode, useState } from "react";
import useScrollQuery from "../../../hooks/useInfiniteQuery";
import { ProductType } from "../../../types/response";

import axiosRequest from "../../../services/axios.config";
import { useSearchParams } from "react-router-dom";
import { productDetails } from "../../../utils/helpers";
import { toast } from "react-toastify";

import { ErrorWrapper, Modal } from "../../../components";
import { MotionDiv, Button } from "../../../ui";
import ProductForm from "./productForm/ProductForm";
import updateVariantsPics from "./productForm/updateVariantsPics";
import { IoIosAddCircle } from "react-icons/io";

export default function ProductsDashboard() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") as string;
  const [isModal, setIsModal] = useState<ReactNode | false>(false);
  const closeModal = () => setIsModal(false);

  const {
    values: products,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    ref,
    refetch,
    hasError,
  } = useScrollQuery<ProductType>({
    queryKey: ["dashboard-products", query],
    url: `/product?query=${query || ""}`,
  });
  if (isLoading) return <img src="/loading.svg" className="self-center" alt="loading icon" />;
  const deleteProduct = async (productId: string) => {
    const fetchData = async () => {
      const { error, message } = await axiosRequest.product.delete(productId);
      if (error) return toast.error(message);
      toast.success(message), refetch(), closeModal();
    };
    setIsModal(<DeleteProduct fetchData={fetchData} close={closeModal} />);
  };

  const newProduct = () => {
    const fetchData = async (values: ProductType) => {
      const variants = await updateVariantsPics(values);
      const { error, message } = await axiosRequest.product.create({ ...values, variants });
      if (error) {
        toast.error(message);
        return;
      }
      toast.success(message), closeModal(), refetch();
    };
    setIsModal(<ProductForm title="New Product" action={fetchData} onClose={closeModal} />);
  };
  const editProduct = (product: ProductType, productId: string) => {
    const fetchData = async (form: ProductType, photosDelete?: string[]) => {
      const variants = await updateVariantsPics(form, photosDelete);
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
      toast.success(message), closeModal(), refetch();
    };
    setIsModal(<ProductForm title="Edit Product" action={fetchData} onClose={closeModal} product={product} />);
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:w-[80%] self-center">
      <ErrorWrapper error={hasError} refetch={refetch}>
        <button onClick={newProduct} type="button" className="sticky top-5">
          <IoIosAddCircle
            className="w-10 h-10 md:h-12 md:w-12 ml-auto text-secondary-100 hover:brightness-110 hover:scale-105
           active:scale-95 duration-100 "
          />
        </button>

        {isModal && (
          <Modal className="mx-auto my-auto" onClose={closeModal}>
            {isModal}
          </Modal>
        )}
        <div className="flex flex-wrap text-gray-200 gap-4 items-center justify-center">
          {products.map((product) => {
            const { coverPhoto, name } = productDetails(product);

            return (
              <div
                className="flex flex-col gap-3 w-full max-w-[250px] border border-primary-200 p-2 max-w-44 h-72 md:h-80 overflow-hidden min-w-[170px]
                 bg-primary-550 rounded-lg md:min-w-[195px] md:max-w-[270px]"
                key={`${product._id}_${name}`}
              >
                <div className=" h-40 md:h-48 flex p-2 bg-white rounded-lg">
                  <img src={coverPhoto} className="w-full object-contain" alt="" />
                </div>
                <div className="w-full pl-2 pr-1">
                  <span className="font-lato font-semibold text-sm md:text-lg line-clamp-2">{name}</span>
                </div>

                <span className="mt-auto grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => deleteProduct(product._id)}
                    className="mt-auto p-1 rounded-lg font-lato font-bold bg-gray-300 text-black"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => editProduct(product, product._id)}
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
      </ErrorWrapper>
    </div>
  );
}

const DeleteProduct = ({ fetchData, close }: { fetchData: () => void; close: () => void }) => {
  return (
    <MotionDiv justY className="p-6 pb-4 rounded-lg bg-primary-500 flex flex-col gap-14">
      <span className="text-xl font-bold">You really want delete this product?</span>
      <div className="grid grid-cols-2 gap-2">
        <Button className="py-2 bg-primary" onClick={close}>
          No
        </Button>
        <Button onClick={fetchData} className="py-2">
          Yes!
        </Button>
      </div>
    </MotionDiv>
  );
};
