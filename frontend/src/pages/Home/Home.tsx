import { motion } from "framer-motion";
import useScrollQuery from "../../hooks/useInfiniteQuery";
import { ProductType } from "../../types/response";

import HighlightProducts from "./HighlightProducts";
import { useCart } from "../../context/Provider";
import CardGrid from "../../components/Card/CardGrid";
import {  Slide, Slider, SliderProps } from "../../components";
import { useState } from "react";
import { blinkVariant } from "../../utils/helpers";
import ImageHash from "../../components/ui/ImageHash";

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
    {
      photo:
        "https://firebasestorage.googleapis.com/v0/b/allinsup-2b48a.appspot.com/o/default%2FmewMettle.jpg?alt=media&token=a705cec0-793e-49b6-9368-9ee28a5ed8d2",
      hash: "L9Iq--JIQ+021B~U07-xMe_0?b9a",
      name: "Meow Mettle",
    },
    {
      photo:
        "https://firebasestorage.googleapis.com/v0/b/allinsup-2b48a.appspot.com/o/default%2Ftoad.jpg?alt=media&token=b71d3b7a-3a6f-49c6-b7eb-fce64e5c2034",
      hash: "L5Avwjxu00$j}UI:6O#n02oy^*Io",
      name: "Power up",
    },
    {
      photo:
        "https://firebasestorage.googleapis.com/v0/b/allinsup-2b48a.appspot.com/o/default%2FzenZest.jpg?alt=media&token=c7084107-a64f-43ab-9ad6-e43f486ef6ef",
      hash: "LREWd602xuRi_IICaioeIBxtM}of",
      name: "ZenZest",
    },
    {
      photo:
        "https://firebasestorage.googleapis.com/v0/b/allinsup-2b48a.appspot.com/o/default%2FpeakPotential.jpg?alt=media&token=cf39e641-1d24-48f3-a057-6e6a90523e22",
      hash: "L4Ir1r~X0J0K00#l,w%35#4;mxt9",
      name: "Peak Potential",
    },
    {
      photo:
        "https://firebasestorage.googleapis.com/v0/b/allinsup-2b48a.appspot.com/o/default%2FharmonyHaven.jpg?alt=media&token=6645b048-d519-4fa1-80f0-2e82e3074ec8",
      hash: "L04LXj.8079c-.NI4?--05IX~Q^#",
      name: "Harmony Haven",
    },

    {
      photo:
        "https://firebasestorage.googleapis.com/v0/b/allinsup-2b48a.appspot.com/o/default%2FsparkSpectrum.jpg?alt=media&token=46372c50-f2fa-4667-b810-5987ea5c9452",
      hash: "LCI}bN0000MwU]S6?wIAI9_3.8RP",
      name: "Spark Spectrum",
    },
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
        {brands.map(({ name, photo, hash }, index) => {
          return (
            <Slide
              key={`${name}_${index}`}
              className={`max-w-[110px] group
                !flex cursor-pointer ml-auto items-center flex-col gap-3 hover:text-secondary-200 duration-200 font-lato text-sm md:max-w-[130px]
                m:font-semibold md:text-lg ${
                  query === name ? "text-secondary-200" : "text-white"
                }`}
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
                <ImageHash
                  src={photo}
                  hash={hash}
                  className="group-hover:scale-105 rounded-full border-primary-500 border-2 "
                />
              </div>

              <span>{name}</span>
            </Slide>
          );
        })}
      </Slider>
      <CardGrid isLoading={isLoading} products={values} />
      {!isFetchingNextPage && hasNextPage && <div ref={ref} />}
    </motion.div>
  );
}
