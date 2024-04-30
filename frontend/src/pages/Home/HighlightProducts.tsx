import { useQuery } from "react-query";
import axiosRequest from "../../services/axios.config";
import ProductSlider from "../../components/Slider/ProductSlider";
import { CartType } from "../../types/response";
import ProductSliderSkeleton from "../../components/Slider/ProductSliderSkeleton";
import ErrorPage from "../../features/Error/ErrorPage";

export default function HighlightProducts({
  cart,
  updateCart,
}: {
  cart: CartType[];
  updateCart: (cart: CartType[]) => void;
}) {
  const { data } = useQuery(
    "hightLight",
    () => {
      return axiosRequest.product.highlight();
    },
    {
      retry: 5,
      refetchOnWindowFocus: false,cacheTime:3000000 
    }
  );

  if (data?.error)
    return (
      <ErrorPage msg="We had a problem trying to get the products highlights" />
    );

  return (
    <div
      className={`bg-center w-full min-h-[420px] bg-cover flex items-end md:min-h-[600px] lg:min-h-[760px] 
        bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]`}
    >
      {data ? (
        <ProductSlider cart={cart} updateCart={updateCart} highlight>
          {[...data.products]}
        </ProductSlider>
      ) : (
        <ProductSliderSkeleton />
      )}
    </div>
  );
}
