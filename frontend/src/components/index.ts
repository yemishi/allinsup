import { Cart } from "../features/Cart";
import Header from "../features/Header/Header";
import RoundedSlider from "./Slider/RoundedSlider";
import { HighlightProducts } from "../features/products/Highlight";

import Slider from "./Slider/Slider";
import { ReactNode } from 'react'
import axiosRequest from "../services/axios.config"

import { SwiperSlide, SwiperProps as SliderProps, Swiper } from "swiper/react";

export { SwiperSlide as Slide, Slider, Swiper, RoundedSlider, Cart, HighlightProducts, Header, axiosRequest }


export type { SliderProps, ReactNode }

