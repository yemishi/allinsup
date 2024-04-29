import ProductGrid from "./Card/CardGrid";
import Slider from "./Slider/Slider";
import Image from "./ui/Image";
import { ReactNode } from "react";
import DivDraggable from "./ui/DivDraggable";

import { SwiperSlide, SwiperProps as SliderProps, Swiper } from "swiper/react";

export {
  SwiperSlide as Slide,
  DivDraggable,
  ProductGrid,
  Slider,
  Swiper,
  Image,
};

export type { SliderProps, ReactNode };
