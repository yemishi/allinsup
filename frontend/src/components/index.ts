import { ProductType } from "../services/axios.config";
import { CollectionRounded } from "./RoundedSlider";
import { Cart } from "./Cart";
import Header from "./Header/Header";
import { HighlightProducts } from "./Highlight";

import Slider from "./Slider/Slider";
import { ReactNode } from 'react'
import axiosRequest from "../services/axios.config"

import { SwiperSlide, SwiperProps as SliderProps, Swiper } from "swiper/react";

export { SwiperSlide as Slide, Slider, Swiper, Cart, CollectionRounded, HighlightProducts, Header, axiosRequest }


export type { SliderProps, ProductType, ReactNode }

