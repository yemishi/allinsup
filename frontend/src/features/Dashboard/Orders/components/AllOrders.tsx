import { useInfiniteQuery } from "react-query"
import { axiosRequest } from "../../../../components"
import { useEffect, useMemo, useRef, useState } from "react"
import { OrderType } from "../../../../types"
import { divList, parseAlt } from "../../../../utils"
import EditOrder from "./EditOrder"
import { Link } from "react-router-dom"
import { ErrorPage, Loading } from "../../.."

export default function AllOrders({ query }: { query: string }) {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [orderId, setOrderId] = useState<string>("")
    const [directionDrag, setDirectionDrag] = useState<"100%" | "-100%">("100%")
    const [open, setOpen] = useState<boolean>(true)
    const observer = useRef<IntersectionObserver | null>(null);
    const ref = useRef<HTMLDivElement>(null)

    const fetchOrders = async ({ query = "", pageParam = 1 }) => {
        const response = await axiosRequest.searchOrder(query, pageParam)
        return response.data
    }

    const { data, isLoading, fetchNextPage, error, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['searchOrders', query],
        ({ pageParam }) => fetchOrders({ query, pageParam }),
        {
            retry: 5,
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length ? allPages.length + 1 : undefined
            },
        }
    )
    const orders = useMemo(() => {
        if (data) {
            return data.pages.reduce((acc: OrderType[], page: OrderType[]) => {
                return [...acc, ...page];
            }, []);
        }
        return [];
    }, [data]);
    useEffect(() => {
        if (!isLoading && hasNextPage) {
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isFetchingNextPage) {
                    fetchNextPage()
                }
            })
            if (ref.current) observer.current?.observe(ref.current)
        }
        return () => {
            if (observer.current) observer.current.disconnect();
        }
    }, [isLoading, hasNextPage, isFetchingNextPage])


    const handleEdit = (orderId: string) => {
        setOrderId(orderId)
        setIsEdit(true)
    }
    if (isLoading) return <Loading />
    if (error) return <ErrorPage msg="Algo deu errado!" />
    const listStyle = "w-full justify-between  pb-2 0 px-2"

    return (

        <div className="flex flex-col items-center text-gray-200 p-4 gap-4 w-full">
            <p className="text-lg font-montserrat font-bold text-secondary-200 lg:text-2xl">{`Total de encomendas: ${orders.length}`}</p>
            {orders.slice().reverse().map((order) => {
                const { extra, orderId, price, products, userId, address, status, purchaseDate } = order
                const { name, cep, complement, houseNumber, tel, address: houseAddress } = address
                const { paymentMethod, change } = extra

                return <div className="w-full lg:text-lg justify-between bg-primary-600 items-center flex gap-1 border border-primary-200 flex-col p-3 rounded-md " key={`${orderId}_${userId}`}>
                    <h2 className="text-lg lg:text-xl font-montserrat font-semibold py-3 text-sky-300">Informações do usuario</h2>

                    {divList("Número do pedido:", orderId, listStyle)}
                    {divList("Nome do usuario:", name, listStyle)}
                    {divList("Endereço:", houseAddress, listStyle)}
                    {divList("Telefone:", String(tel), listStyle)}
                    {divList("Número da morada:", String(houseNumber), listStyle)}
                    {complement && divList("Valor da compra:", complement, "w-full justify-between pb-2 px-2")}
                    {divList("Cep:", cep, "w-full justify-between border-b-2 pb-3 border-dashed border-primary-200 px-2")}

                    <h2 className="text-lg font-montserrat font-semibold py-3 text-sky-300">Dados da compra</h2>
                    {divList("Data da compra:", purchaseDate, listStyle)}
                    {divList("Valor da compra:", price, "w-full justify-between pb-2 px-2")}
                    {divList("Estado do pedido:", status, "w-full justify-between pb-2 px-2")}
                    {change && divList("Troco para:", change, "w-full justify-between pb-2 px-2")}
                    {divList("Método de pagamento:", paymentMethod, "w-full justify-between  pb-2 px-2 border-b-2 border-dashed border-primary-200")}

                    <h2 className="text-lg lg:text-xl font-montserrat font-semibold py-3 text-sky-300">Produtos</h2>

                    <div className="flex flex-col gap-6 w-full md:grid md:grid-cols-2 ">
                        {products.map((product, index) => {
                            const { coverPhoto, name, productQtd } = product

                            return <div key={`${name}_${index}`} className="flex gap-4 w-full justify-between border-b pb-2 border-primary-200 ">
                                <span className="w-36 h-36 lg:w-40 lg:h-40">
                                    <img className="w-full h-full object-contain p-2 bg-white rounded-lg" src={coverPhoto} alt={parseAlt(coverPhoto)} />
                                </span>
                                <div className="flex flex-col gap-2 flex-1">
                                    <p className="font-lato text-base lg:text-lg self-end font-semibold text-secondary-200">{name}</p>
                                    <span className="flex self-end mt-auto  gap-2">
                                        <p className="font-thin">Quantidade:</p>
                                        <p className="font-bold text-secondary-500">{productQtd}</p>
                                    </span>
                                </div>
                            </div>
                        })}
                    </div>
                    <span className="flex mt-auto w-full gap-3">
                        <Link to={`/dashboard-admin/orders/see-order/${orderId}`} className="p-2 bg-sky-500 flex-1 font-semibold font-lato rounded-t-lg text-center">Olhar</Link>
                        <button onClick={() => handleEdit(orderId)} className="p-2 bg-secondary-600 flex-1 font-semibold font-lato rounded-t-lg">Editar</button>
                    </span>
                </div>
            })}
            {isEdit && <EditOrder closeParent={() => setIsEdit(false)} directionDrag={directionDrag} setDirectionDrag={setDirectionDrag}
                setState={setOpen} state={open} orderId={orderId} />}

            {hasNextPage ? <div ref={ref} /> : <div onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="bg-primary-500 p-2 mt-3 rounded-t-2xl text-secondary-500 w-full text-center lg:w-auto lg:px-11 lg:py-3 lg:rounded-full lg:text-lg">
                <p className="font-bold cursor-pointer font-serif ">FIM DA LISTA</p>
            </div>}
        </div>
    )
}