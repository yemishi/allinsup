import ProductGrid from "./Card/CardGrid";
import Slider from "./Slider/Slider";
import Image from "./ui/Image";
import { ReactNode } from "react";
import axiosRequest from "../services/axios.config";
import DivDraggable from "./ui/DivDraggable";
import { toast } from "react-toastify";

import { SwiperSlide, SwiperProps as SliderProps, Swiper } from "swiper/react";

export {
  SwiperSlide as Slide,
  DivDraggable,
  toast,
  ProductGrid,
  Slider,
  Swiper,
  axiosRequest,
  Image,
};

export type { SliderProps, ReactNode };
