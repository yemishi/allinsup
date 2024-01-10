
import { Link, Outlet, useLocation } from "react-router-dom"

export default function DashboardOrders() {

    const location = useLocation()
    const checkPath = (path: string) => location.pathname.toLowerCase().includes(path)
    return (
        <div className="flex flex-col">
            <div className="w-full flex bg-primary-600 font-anton font-bold   ">


                <Link className={`p-3 duration-300  flex-1 ${checkPath("search-order") ? "bg-primary-500 text-secondary-200" : "bg-primary-600 text-gray-300"}`}
                    to={"/dashboard-admin/orders/search-orders"}>Procurar encomenda</Link>

                <span className={`p-3 duration-300  flex-1 ${checkPath("see-order") ? "bg-primary-500 text-secondary-200" : "bg-primary-600 text-gray-300"}`}
                >Visualizar encomenda</span>

            </div>
            <Outlet />
        </div>)

}