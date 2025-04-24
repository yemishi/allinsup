import { motion } from "framer-motion";
import useScrollQuery from "../../hooks/useInfiniteQuery";
import { ProductType } from "../../types/response";

import brandIcon from "./assets/brand-icon.jpg";

import HighlightPanel from "./HighlightPanel/HighlightPanel";

import { useCart } from "../../context/Provider";
import { Slide, Slider, SliderProps, ErrorWrapper } from "../../components";
import { lazy, Suspense, useState } from "react";
import { blinkVariant } from "../../utils/helpers";
import { Image } from "../../ui";

const CardGrid = lazy(() => import("../../components/Card/CardGrid"));

export default function Home() {
  const { cart, updateCart } = useCart();
  const [query, setQuery] = useState("Meow Mettle");
  const { ref, values, hasNextPage, isFetchingNextPage, refetch, isLoading, isError } = useScrollQuery<ProductType>({
    queryKey: ["products", "home-page", query],
    url: `/product?brand=${query.toLowerCase()}`,
  });

  const settings: SliderProps = {
    freeMode: true,
    slidesPerView: "auto",
    spaceBetween: 50,
    style: {
      width: "100%",
      padding: "20px",
      background: "#1e1e1e",
      cursor: "grab",
    },
    breakpoints: {
      1024: {
        allowTouchMove: false,
      },
    },
  };
  const brands = ["Meow Mettle", "Power up", "ZenZest", "Peak Potential", "Harmony Haven", "Spark Spectrum"];

  return (
    <motion.div
      variants={blinkVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="w-full text-white h-full flex flex-col gap-4 overflow-hidden justify-center items-center "
    >
      <HighlightPanel cart={cart} updateCart={updateCart} />
      <Slider settings={settings}>
        {brands.map((name, index) => {
          return (
            <Slide
              key={`${name}_${index}`}
              className={`max-w-[110px] group
                !flex cursor-pointer ml-auto items-center text-center flex-col gap-3 hover:text-secondary-200 duration-200 font-lato text-sm md:max-w-[130px]
                m:font-semibold md:text-lg ${query === name ? "text-secondary-200" : "text-white"}`}
            >
              <div
                onClick={() => setQuery(name)}
                className={`h-[110px] w-[110px] lg:h-[125px] lg:w-[125px] overflow-hidden duration-200 bg-primary rounded-full border-2 
                       ${
                         query === name
                           ? "border-secondary-200 border-[3px]"
                           : "border-primary-200  group-hover:border-secondary-200 group-hover:border-opacity-50 group-hover:border-[3px]"
                       }`}
              >
                <Image src={brandIcon} />
              </div>

              <span>{name}</span>
            </Slide>
          );
        })}
      </Slider>
      <Suspense fallback={<img src="/loading.svg" alt="loading" />}>
        <ErrorWrapper refetch={refetch} error={isError}>
          {values.length === 0 && !isLoading && (
            <span className="text-xl font-semibold text-secondary-500 mt-4">No products found for this brand.</span>
          )}
          <Suspense fallback={<img src="/loading.svg" alt="loading" />}>
            <CardGrid isLoading={isLoading} products={values} />
          </Suspense>
          {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
        </ErrorWrapper>
      </Suspense>
    </motion.div>
  );
}
