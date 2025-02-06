import { motion } from "framer-motion";
import useScrollQuery from "../../hooks/useInfiniteQuery";
import { ProductType } from "../../types/response";

import HighlightProducts from "./HighlightProducts";
import CardGrid from "../../components/Card/CardGrid";
import { useCart } from "../../context/Provider";
import { Image, Slide, Slider, SliderProps } from "../../components";
import { useState } from "react";
import { blinkVariant } from "../../utils/helpers";

export default function Home() {
  const { cart, updateCart } = useCart();
  const [query, setQuery] = useState("Meow Mettle");
  const { ref, values, hasNextPage, isFetchingNextPage, isLoading } =
    useScrollQuery<ProductType>({
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
  const brands = [
    "Meow Mettle",
    "Power up",
    "ZenZest",
    "Peak Potential",
    "Harmony Haven",
    "Spark Spectrum",
  ];
  return (
    <motion.div
      variants={blinkVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="w-full text-white h-full flex flex-col gap-4 overflow-hidden justify-center items-center "
    >

      <HighlightProducts cart={cart} updateCart={updateCart} />
      <Slider settings={settings}>
        {brands.map((name, index) => {
          return (
            <Slide
              key={`${name}_${index}`}
              className={`max-w-[110px] group
                !flex cursor-pointer ml-auto items-center text-center flex-col gap-3 hover:text-secondary-200 duration-200 font-lato text-sm md:max-w-[130px]
                m:font-semibold md:text-lg ${query === name ? "text-secondary-200" : "text-white"
                }`}
            >
              <div
                onClick={() => setQuery(name)}
                className={`h-[110px] w-[110px] lg:h-[125px] lg:w-[125px] overflow-hidden duration-200 bg-primary rounded-full border-2 
                       ${query === name
                    ? "border-secondary-200 border-[3px]"
                    : "border-primary-200  group-hover:border-secondary-200 group-hover:border-opacity-50 group-hover:border-[3px]"
                  }`}
              >
                <Image src="https://firebasestorage.googleapis.com/v0/b/allinsup-2b48a.appspot.com/o/default%2FmewMettle.jpg?alt=media&token=a705cec0-793e-49b6-9368-9ee28a5ed8d2" />
              </div>

              <span>{name}</span>
            </Slide>
          );
        })}
      </Slider>
      {values.length === 0 && !isLoading && (
        <span className="text-xl font-semibold text-secondary-500 mt-4">No products found for this brand.</span>
      )}
      <CardGrid isLoading={isLoading} products={values} />
      {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
    </motion.div>
  );
}
