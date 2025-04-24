import { ReactNode } from "react";
import { Swiper, SliderProps } from "..";
import { SwiperSlide } from "swiper/react";
import { Navigation, A11y, Pagination, EffectFade, Autoplay, FreeMode, Thumbs, Controller } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

interface PropsType {
  children: ReactNode;
  settings: SliderProps;
}

export default function Slider({ settings, children }: PropsType) {
  return (
    <Swiper modules={[Thumbs, Navigation, Pagination, A11y, EffectFade, Autoplay, FreeMode, Controller]} {...settings}>
      {children}
    </Swiper>
  );
}

export { SwiperSlide as Slide };
