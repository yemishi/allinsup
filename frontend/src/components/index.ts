import ProductGrid from "./Card/CardGrid.tsx";
import { SwiperSlide, SwiperProps as SliderProps, Swiper } from "swiper/react";

import Form from "./Form/Form.tsx";
import SignInForm from "./Form/User/SignInForm.tsx";
import SignUpForm from "./Form/User/SignUpForm.tsx";
import Login from "./Form/User/Login.tsx";
import UserAddressForm from "./Form/User/UserAddressForm.tsx";

import Card from "./Card/Card.tsx";
import CardSkeleton from "./Card/CardSkeleton.tsx";
import CardGrid from "./Card/CardGrid.tsx";

import Cart from "./Header/Cart/Cart.tsx";

import Modal from "./Modal/Modal.tsx";

import CheckoutGrid from "./Checkout/CheckoutGrid.tsx";
import createOrder from "./Checkout/createOrder.ts";
import stripeCheckout from "./Checkout/stripeCheckout.ts";

import ProductSlider from "./Slider/ProductSlider.tsx";
import ProductSliderSkeleton from "./Slider/ProductSliderSkeleton.tsx";
import Slider from "./Slider/Slider.tsx";

import ErrorWrapper from "./ErrorWrapper/ErrorWrapper.tsx";

export {
  SwiperSlide as Slide,
  ProductGrid,
  Swiper,
  Form,
  SignInForm,
  SignUpForm,
  Login,
  UserAddressForm,
  Card,
  CardSkeleton,
  CardGrid,
  Cart,
  Modal,
  CheckoutGrid,
  createOrder,
  stripeCheckout,
  ProductSlider,
  ProductSliderSkeleton,
  Slider,
  ErrorWrapper,
};

export type { SliderProps };
