import { useEffect, useState, } from "react"
import { OrderType } from "../types"
import { axiosRequest } from "../components"
import { divList } from "../utils"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { Loading } from "../features"

export default function Orders() {
    const [orders, setOrders] = useState<OrderType[]>()
    const { data, isError, isLoading } = useQuery(
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

    const reloadPage = () => {
        window.location.reload();
    };

    if (isLoading) return <Loading />

    if (isError) return <div className="flex flex-col items-center gap-2 py-6  w-full text-gray-200">
        <img src="./public/error.svg" className="w-20" alt="error icon" />
        <h1 className="text-xl mt-4 font-anton font-semibold text-center px-6">Não conseguimos buscar seus pedidos 😞</h1>

        <span className="my-10 w-full self-center flex flex-col gap-4 items-center">
            <p className="font-lato font-thin text-gray-400">Tente recarregar a pagina!</p>
            <button onClick={reloadPage} className="self-center bg-primary-200 p-2 font-anton font-bold rounded-md px-4">Recarregar</button>
        </span>
    </div>

    return (
        <div className="flex flex-col items-center p-4 text-white gap-5">
            <h1 className="text-xl mt-4 self-baseline font-anton font-semibold">Meus pedidos</h1>
            {orders && orders.length > 0 ? orders.slice().reverse().map((order, index) => {
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
                <svg viewBox="0 -3 24 24" className="w-32 fill-slate-700" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M7 0V6C7 6.74338 7.78231 7.2269 8.44721 6.89443L12 5.11803L15.5528 6.89443C16.2177 7.2269 17 6.74338 17 6V0H22C23.1046 0 24 0.89543 24 2V16C24 17.1046 23.1046 18 22 18H2C0.89543 18 0 17.1046 0 16V2C0 0.89543 0.89543 0 2 0H7zM9 0H15V4.38197L12.4472 3.10557C12.1657 2.96481 11.8343 2.96481 11.5528 3.10557L9 4.38197V0z" ></path></g></svg>
                <p className="text-gray-600 text-lg text-center">
                    Você não possui nenhum pedido ainda.
                </p>

            </div>}

        </div>
    )
}