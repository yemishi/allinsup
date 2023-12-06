import { ProductType } from "./axios.config";
import Slider from "./Slider/Slider";
import { ReactNode } from 'react'
import axiosRequest from "./axios.config";

import { SwiperSlide, SwiperProps as SliderProps, Swiper } from "swiper/react";

export { SwiperSlide as Slide, Slider, Swiper, axiosRequest }


export type { SliderProps, ProductType, ReactNode }
