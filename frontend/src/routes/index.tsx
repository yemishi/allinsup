import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from './routesConfig'

const router = createBrowserRouter(routesConfig)

const Routes = () => {
    return (
        <RouterProvider router={router} />
    )
}
export default Routes