import CollectionRounded from "./products/CollectionRounded/CollectionRounded";
import Products from "./products/AllProducts/ProductProvider";
import ProductInfo from "./products/ProductInfo/ProductInfo";
import { User } from "./User/index";
import Header from "./Header/Header";
import { Cart } from "./Cart";
import SearchProduct from "./products/SearchProduct/SearchProduct";
import ProductSliderGrid from "./products/ProductSlider/ProductSliderGrid";
import HighlightProducts from "./products/Highlight/HighlightProducts";
import Payment from "./Checkout/Payment";
import Review from "./Checkout/Review";
import Address from "./Checkout/Adress";
import Steps from "./Checkout/Steps";
import MoneyMethod from "./Checkout/MoneyMethod";
import PurchaseSummary from "./Checkout/PurchaseSummary";
import DashboardOrders from "./Dashboard/Orders/DashboardOrders";
import DashboardProducts from "./Dashboard/Products/DashboardProducts";
import RemoveProduct from "./Dashboard/Products/RemoveProduct";
import EditProduct from "./Dashboard/Products/EditProduct";
import CreateProduct from "./Dashboard/Products/CreateProduct";
import Footer from "./Footer/Footer";
import Loading from "./Loading";
import ErrorPage from "./Error/ErrorPage";
import BurgerMenu from "./Menu/BurgerMenu";

export {
    CollectionRounded, BurgerMenu, ErrorPage, Loading, Footer, PurchaseSummary, MoneyMethod, Steps, Payment, Address, Review, Cart, Header, User, HighlightProducts,
    ProductSliderGrid, DashboardOrders, DashboardProducts, Products, SearchProduct, ProductInfo, RemoveProduct, CreateProduct, EditProduct
}