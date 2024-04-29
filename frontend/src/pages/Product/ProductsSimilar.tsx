import { useQuery } from "react-query";
import axiosRequest from "../../services/axios.config";
import ProductSlider from "../../components/Slider/ProductSlider";
import { CartType } from "../../types/response";
import ErrorPage from "../../features/Error/ErrorPage";

export default function ProductsSimilar({
  query,
  cart,
  updateCart,
  category,
  brand,
  title,
}: {
  query: string;
  cart: CartType[];
  updateCart: (updated: CartType[]) => void;
  category?: string;
  brand?: string;
  title?: string;
}) {
  const { data } = useQuery({
    queryFn: () => axiosRequest.product.many(0, 10, query, brand, category),
    queryKey: ["Product-similar", query],
  });
  if (data?.error || !data)
    return (
      <ErrorPage msg="We had a problem trying to recover some products similar" />
    );

  if (data.products.length === 0) return <></>;
  return (
    <>
      <span className="border-l-4 border-secondary-600 flex items-center justify-between md:py-1 md:border-l-[6px] my-2 self-start">
        <h3 className="font-lato font-semibold text-lg ml-1 md:text-xl">
          {title || " Products similar"}
        </h3>
      </span>
      <ProductSlider cart={cart} updateCart={updateCart}>
        {[...data.products]}
      </ProductSlider>
    </>
  );
}
