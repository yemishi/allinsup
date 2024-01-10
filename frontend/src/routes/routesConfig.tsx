import Home from "../pages/Home";
import Search from "../pages/Search";
import App from "../App";
import ProductPanel from "../pages/ProductPanel";
import Checkout from "../pages/Checkout";
import { Payment, Address, Review, DashboardOrders, DashboardProducts, RemoveProduct, CreateProduct, EditProduct } from "../features/";
import OrderInfo from "../pages/OrderInfo";
import Orders from "../pages/Orders";
import DashboardAdmin from "../pages/DashboardAdmin";
import OrdersPanel from "../features/Dashboard/Orders/OrdersPanel";
import OrderPanel from "../features/Dashboard/Orders/OrderPanel";
import NotFoundPage from "../pages/NotFoundPage";


const routesConfig = [
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {

                element: <Checkout />,
                children: [
                    {
                        path: '/checkout/payment',
                        element: <Payment />
                    },
                    {
                        path: '/checkout/address',
                        element: <Address />
                    },
                    {
                        path: '/checkout/review',
                        element: <Review />
                    }

                ],
            },
            {
                path: "/dashboard-admin",
                element: <DashboardAdmin />,
                children: [
                    {
                        path: "products",
                        element: <DashboardProducts />,
                        children: [
                            {
                                path: "remove-product",
                                element: <RemoveProduct />
                            }, {
                                path: "create-product",
                                element: <CreateProduct />
                            }, {
                                path: "edit-product",
                                element: <EditProduct />
                            }
                        ]
                    }, {
                        path: "orders",
                        element: <DashboardOrders />,
                        children: [
                            {
                                path: "search-orders",
                                element: <OrdersPanel />,
                            },
                            {
                                path: "see-order/:orderId",
                                element: <OrderPanel />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/orderInfo/:orderId',
                element: <OrderInfo />
            },
            {
                path: '/myOrders',
                element: <Orders />
            },
            {
                path: '/search',
                element: <Search />
            }, {
                path: '/:category/:name/:_id',
                element: <ProductPanel />
            }, {
                path: "*",
                element: < NotFoundPage />
            }
        ]
    }
];


export default routesConfig