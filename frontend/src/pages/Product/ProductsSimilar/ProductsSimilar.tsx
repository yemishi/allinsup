import { useQuery } from "react-query";
import axiosRequest from "../../../services/axios.config";
import ProductSlider from "../../../components/Slider/ProductSlider";
import { CartType } from "../../../types/response";
import { ErrorWrapper } from "../../../components";

export default function ProductsSimilar({
  query,
  cart,
  updateCart,
  category,
  brand,
  title,
}: {
  cart: CartType[];
  updateCart: (updated: CartType[]) => void;
  query?: string;
  category?: string;
  brand?: string;
  title?: string;
}) {
  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: () => axiosRequest.product.many(0, 10, query, brand, category),
    queryKey: ["Product-similar", query, brand, category],
  });
  if (!data?.error && data?.products.length === 0) return <></>;

  return (
    <>
      <span className="border-l-4 border-secondary-600 flex items-center justify-between md:py-1 md:border-l-[6px] my-2 self-start">
        <h3 className="font-lato font-semibold text-lg ml-1 md:text-xl">{title || " Products similar"}</h3>
      </span>
      <ErrorWrapper error={isError} refetch={refetch}>
        {isLoading ? (
          <img src="/loading.svg" alt="loading" className="h-40 w-40 mx-auto" />
        ) : (
          <ProductSlider cart={cart} updateCart={updateCart}>
            {data && !data?.error ? [...data.products] : []}
          </ProductSlider>
        )}
      </ErrorWrapper>
    </>
  );
}
