import { Link, Outlet, useLocation } from "react-router-dom";

export default function DashboardProducts() {
    const location = useLocation()
    const checkPath = (path: string) => location.pathname.toLowerCase().includes(path)
    return (
        <div className="flex flex-col">
            <div className="w-full flex bg-primary-600 font-anton font-bold text-sm">
                <Link className={`p-3 duration-300 flex-1 ${checkPath("create-product") ? "bg-primary-500 text-secondary-200" : "bg-primary-600 text-gray-300"}`}
                    to={"/dashboard-admin/products/create-product"}>Novo produto</Link>

                <Link className={`p-3 duration-300  flex-1 ${checkPath("edit-product") ? "bg-primary-500 text-secondary-200" : "bg-primary-600 text-gray-300"}`}
                    to={"/dashboard-admin/products/edit-product"}>Editar Produto</Link>

                <Link className={`p-3 duration-300  flex-1 ${checkPath("remove-product") ? "bg-primary-500 text-secondary-200" : "bg-primary-600 text-gray-300"}`}
                    to={"/dashboard-admin/products/remove-product"}>Deletar Produto</Link>

            </div>
            <Outlet />
        </div>
    )
}