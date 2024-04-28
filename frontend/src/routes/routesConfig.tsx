import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";

import Order from "../pages/Order/Order";
import Orders from "../pages/MyOrders/Orders";
import Dashboard from "../pages/Dashboard/Dashboard";

import NotFoundPage from "../pages/NotFoundPage";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Product from "../pages/Product/Product";
import ProductsDashboard from "../pages/Dashboard/Product/ProductsDasboard";
import OrdersDashboard from "../pages/Dashboard/Order/OrdersDashboard";

export default function RoutesConfig() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/my-orders" element={<Orders />} />

        <Route path="/product/:_id" element={<Product />} />
        <Route path="/search" element={<Search />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route path="products" element={<ProductsDashboard />} />
          <Route path="orders" element={<OrdersDashboard />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}
