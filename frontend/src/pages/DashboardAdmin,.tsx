import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoCloseEvent } from "../utils/helpers";
import { useEffect } from "react";
import { axiosRequest } from "../components";
import loginRequest from "../features/User/services/axios.config";

export default function DashboardAdmin() {
    const location = useLocation()
    const navigate = useNavigate()
    const productPath = location.pathname.toLowerCase().includes('/products')
    const orderPath = location.pathname.toLowerCase().includes('/orders')
    useEffect(() => {
        const fetchAdmin = async () => {
            const response = await loginRequest.checkAuth()
            const adminNumber = import.meta.env.VITE_ADMIN_NUMBER

            if (!response.isAuthenticated) return navigate('/404')

            const { tel } = response.user

            if (adminNumber !== tel) return navigate('/404')
        }
        fetchAdmin()
    }, [])
    return (
        <div className="flex flex-col gap-4">
            <header className="w-full p-2 bg-primary-600">
                {logoCloseEvent(() => navigate('/'))}
            </header>
            <div className="  text-gray-400 px-5 flex gap-2 font-lato ">
                <Link to={'/dashboard-admin/products'} className={`border-b ${productPath ? "text-secondary-200 border-secondary-200" : "border-gray-400 text-gray-400"}`}>productos</Link>
                <Link className={`border-b ${orderPath ? "text-secondary-200 border-secondary-200" : "border-gray-400 text-gray-400"}`}
                    to={'/dashboard-admin/orders'}>encomendas</Link>
            </div>
            <Outlet />
        </div>
    )
}