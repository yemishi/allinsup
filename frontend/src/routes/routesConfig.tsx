import Home from "../pages/Home";
import Search from "../pages/Search";
import App from "../App";
import ProductPanel from "../pages/ProductPanel";
import Checkout from "../pages/Checkout";
import { Payment, Address, Review } from "../features/";


const routesConfig = [
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/checkout',
                element: <Checkout />,
                children: [
                    {
                        path: 'payment',
                        element: <Payment />
                    },
                    {
                        path: 'address',
                        element: <Address />
                    },
                    {
                        path: 'review',
                        element: <Review />
                    }

                ],
            },
            {
                path: '/search',
                element: <Search />
            }, {
                path: '/:category/:name/:_id',
                element: <ProductPanel />
            }
        ]
    }
];


export default routesConfig