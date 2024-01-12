import Home from "../pages/Home";
import Search from "../pages/Search";
import ProductPanel from "../pages/ProductPanel";
import Checkout from "../pages/Checkout";
import { Payment, Address, Review, DashboardOrders, DashboardProducts, RemoveProduct, CreateProduct, EditProduct } from "../features/";
import OrderInfo from "../pages/OrderInfo";
import Orders from "../pages/Orders";
import DashboardAdmin from "../pages/DashboardAdmin";
import OrdersPanel from "../features/Dashboard/Orders/OrdersPanel";
import OrderPanel from "../features/Dashboard/Orders/OrderPanel";
import NotFoundPage from "../pages/NotFoundPage";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import OptionMenu from "../pages/OptionMenu";


export default function RoutesConfig() {
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname} >
                <Route path="/" element={<Home />} />

                <Route path="/orderInfo/:orderId" element={<OrderInfo />} />
                <Route path="/myOrders" element={<Orders />} />

                <Route path="/search" element={<Search />} />
                <Route path="/:category/:name/:_id" element={<ProductPanel />} />
                <Route path="/option-menu/:q" element={<OptionMenu />} />

                <Route path="/checkout" element={<Checkout />}>
                    <Route path="/checkout/payment" element={<Payment />} />
                    <Route path="/checkout/address" element={<Address />} />
                    <Route path="/checkout/review" element={<Review />} />
                </Route>

                <Route path="/dashboard-admin" element={<DashboardAdmin />}>
                    <Route path="products" element={<DashboardProducts />}>
                        <Route path="create-product" element={<CreateProduct />} />
                        <Route path="edit-product" element={<EditProduct />} />
                        <Route path="remove-product" element={<RemoveProduct />} />
                    </Route>

                    <Route path="orders" element={<DashboardOrders />}>
                        <Route path="search-orders" element={<OrdersPanel />} />
                        <Route path="see-order/:orderId" element={<OrderPanel />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </AnimatePresence>
    )

}