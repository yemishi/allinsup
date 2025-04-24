import { useQuery } from "react-query";
import axiosRequest from "../../../services/axios.config";
import ProductSlider from "../../../components/Slider/ProductSlider";
import { CartType } from "../../../types/response";
import ProductSliderSkeleton from "../../../components/Slider/ProductSliderSkeleton";
import highlightBackground from "../assets/highLightBg.png";
import { ErrorWrapper } from "../../../components";

export default function HighlightPanel({
  cart,
  updateCart,
}: {
  cart: CartType[];
  updateCart: (cart: CartType[]) => void;
}) {
  const { data, isError, refetch, isLoading } = useQuery(
    "hightLight",
    () => {
      return axiosRequest.product.highlight();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div
      style={{ backgroundImage: `url(${highlightBackground})` }}
      className="bg-center w-full bg-cover flex items-end min-h-[420px] md:min-h-[600px] lg:min-h-[760px]"
    >
      <ErrorWrapper
        className="mb-4"
        refetch={refetch}
        error={data?.error || isError}
        message={data?.message || "We had a problem trying to get the products highlights"}
      >
        {data && !data.error && (
          <ProductSlider cart={cart} updateCart={updateCart} highlight>
            {[...data.products]}
          </ProductSlider>
        )}
        {isLoading && <ProductSliderSkeleton />}
      </ErrorWrapper>
    </div>
  );
}
