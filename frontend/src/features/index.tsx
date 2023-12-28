import { lazy } from "react";
import CollectionRounded from "./products/CollectionRounded/CollectionRounded";
import Products from "./products/AllProducts/ProductProvider";
import ProductInfo from "./products/ProductInfo/ProductInfo";
import { User } from "./User/index";
import Header from "./Header/Header";
import { Cart } from "./Cart";
import SearchProduct from "./products/SearchProduct/SearchProduct";
const ProductSliderGrid = lazy(() => import("./products/ProductSlider/ProductSliderGrid"));
import HighlightProducts from "./products/Highlight/HighlightProducts";
import Payment from "./Checkout/Payment";
import Review from "./Checkout/Review";
import Address from "./Checkout/Adress";
import Steps from "./Checkout/Steps";

export { CollectionRounded, Steps, Payment, Address, Review, Cart, Header, User, HighlightProducts, ProductSliderGrid, Products, SearchProduct, ProductInfo }