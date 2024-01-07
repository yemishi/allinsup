import { useEffect, useState, } from "react"
import { OrderType } from "../types"
import { axiosRequest } from "../components"
import { divList } from "../utils"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"

export default function Orders() {
    const [orders, setOrders] = useState<OrderType[]>()
    const { data } = useQuery(
        "orders",
        async () => {
            const response = await axiosRequest.getOrders();
            return response.data;
        },
        {
            retry: 5,
            retryDelay: 100,
        }
    );


    useEffect(() => {
        if (data) {
            setOrders(data);
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center p-4 text-white gap-5">
            <h1 className="text-xl mt-4 self-baseline font-anton font-semibold">Meus pedidos</h1>
            {orders ? orders.map((order, index) => {
                const { orderId, price, purchaseDate, status } = order
                return <div key={`${order}_${index}`} className="p-4  border font-lato text-gray-200 flex w-full rounded bg-primary-550
                border-gray-600 ">
                    <dl className="w-full flex flex-col gap-1">
                        {divList("Encomenda N°:", orderId)}
                        {divList("Data da compra:", purchaseDate)}
                        {divList("Valor:", price)}
                        {divList("Situação:", status)}
                        {divList("Encomenda N°:", orderId)}
                    </dl>
                    <Link to={`/orderInfo/${orderId}`} className="ml-auto px-2 py-1  border mt-auto border-gray-500  font-serif font-thin rounded-md">Detalhes</Link>
                </div>
            }) : <div className="flex flex-col items-center justify-center mt-10 mb-16 ">
                <img className="w-40 h-40 mb-6" src="./public/noOrder.svg" alt="sem pedido ilustracao" />
                <p className="text-gray-600 text-lg text-center">
                    Você não possui nenhum pedido ainda.
                </p>
                <button >

                </button>
            </div>}

        </div>
    )
}