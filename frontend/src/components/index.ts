import ProductGrid from "./Card/CardGrid";
import { SwiperSlide, SwiperProps as SliderProps, Swiper } from "swiper/react";

export { SwiperSlide as Slide, ProductGrid, Swiper };
export { default as Form } from "./Form/Form.tsx";

export { default as SignInForm } from "./Form/User/SignInForm.tsx";
export { default as SignUpForm } from "./Form/User/SignUpForm.tsx";
export { default as Login } from "./Form/User/Login.tsx";
export { default as UserAddressForm } from "./Form/User/UserAddressForm.tsx";

export { default as Card } from "./Card/Card.tsx";
export { default as CardSkeleton } from "./Card/CardSkeleton.tsx";
export { default as CardGrid } from "./Card/CardGrid.tsx";

export { default as Cart } from "./Header/Cart/Cart.tsx";

export { default as Modal } from "./Modal/Modal.tsx";

export { default as CheckoutGrid } from "./Checkout/CheckoutGrid.tsx";
export { default as createOrder } from "./Checkout/createOrder.tsx";
export { default as stripeCheckout } from "./Checkout/stripeCheckout.tsx";

export { default as ProductSlider } from "./Slider/ProductSlider.tsx";
export { default as ProductSliderSkeleton } from "./Slider/ProductSliderSkeleton.tsx";
export { default as Slider } from "./Slider/Slider.tsx";

export { default as ErrorWrapper } from "./ErrorWrapper/ErrorWrapper.tsx";

export type { SliderProps };
