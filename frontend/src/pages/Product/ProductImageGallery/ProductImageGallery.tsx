import { useState } from "react";
import {  Slide, Slider, SliderProps } from "../../../components";
import { Navigation, Thumbs } from "swiper/modules";

import SwiperCore from "swiper";
import checkDev from "../../../utils/isMobile";
import { Image } from "../../../ui";

export default function ProductImageGallery({ photos }: { photos: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const isMobile = checkDev();
  SwiperCore.use([Navigation, Thumbs]);

  const settings: SliderProps = {
    spaceBetween: 40,
    slidesPerView: 1,
    thumbs: { swiper: thumbsSwiper },

    className:
      "rounded-lg bg-white w-full h-[340px] lg:h-[400px] xl:h-[500px] xl:w-[70%]",
    pagination: true,
  };

  const thumbSettings: SliderProps = {
    onSwiper: setThumbsSwiper,
    slidesPerView: "auto",
    direction: "vertical",
    spaceBetween: 10,
    className: "sticky top-0 left-0 w-[15%] h-full xl:w-[10%] ",
    thumbs: {
      slideThumbActiveClass: "thumb-active",
    },
  };

  return (
    <>
      {!isMobile && (
        <Slider settings={thumbSettings}>
          {photos.map((e, i) => (
            <Slide
              key={`${e}_${i}`}
              className="!h-16 lg:!h-20 xl:!h-24 cursor-pointer !w-full bg-white rounded-lg sticky top-0"
            >
              <Image
                src={e}
                className="object-contain p-2 hover:scale-105 duration-300"
              />
            </Slide>
          ))}
        </Slider>
      )}
      <Slider settings={settings}>
        {photos.map((e, i) => (
          <Slide key={`${e}_${i}`} className=" ">
            <div className="h-[340px] w-full md:h-full">
              <Image
                src={e}
                className="object-contain p-4 hover:scale-105 duration-300"
              />
            </div>
          </Slide>
        ))}
      </Slider>
    </>
  );
}
