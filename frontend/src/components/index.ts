import ProductGrid from "./Card/CardGrid";
import { SwiperSlide, SwiperProps as SliderProps, Swiper } from "swiper/react";

export { SwiperSlide as Slide, ProductGrid, Swiper };
export { default as Form } from "./form/Form";

export { default as SignInForm } from "./form/user/SignInForm";
export { default as SignUpForm } from "./form/user/SignUpForm";
export { default as Login } from "./form/user/Login";
export { default as UserAddressForm } from "./form/user/UserAddressForm";

export { default as Card } from "./Card/Card";
export { default as CardSkeleton } from "./Card/CardSkeleton";
export { default as CardGrid } from "./Card/CardGrid";

export { default as Cart } from "./Header/Cart/Cart";

export { default as Modal } from "./Modal/Modal";

export { default as CheckoutGrid } from "./Checkout/CheckoutGrid";
export { default as createOrder } from "./Checkout/createOrder";
export { default as stripeCheckout } from "./Checkout/stripeCheckout";

export { default as ProductSlider } from "./Slider/ProductSlider";
export { default as ProductSliderSkeleton } from "./Slider/ProductSliderSkeleton";
export { default as Slider } from "./Slider/Slider";

export { default as ErrorWrapper } from "./ErrorWrapper/ErrorWrapper";

export type { SliderProps };
