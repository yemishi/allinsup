import { useQuery } from "react-query"
import { axiosRequest } from "../../../components"
import { useParams } from "react-router-dom"
import { divList, parseAlt } from "../../../utils"
import { ErrorPage, Loading } from "../.."

export default function OrderPanel() {
    const { orderId } = useParams()
    const { data, error, isLoading } = useQuery("order", async () => {
        const response = await axiosRequest.adminOrderInfo(orderId as string)
        return response.data
    }
    )

    if (isLoading) return <Loading />
    if (error || !data) return <ErrorPage />

    const { extra, price, products, purchaseDate, receivedDate, status, userId, address } = data
    const { name, cep, complement, houseNumber, tel, address: houseAddress } = address
    const { paymentMethod, change } = extra

    return (
        <div className="flex flex-col items-center text-gray-200 p-4 gap-4 w-full">

            <div className="w-full justify-between  bg-primary-600 items-center flex gap-1  flex-col p-3 rounded-md " key={`${orderId}_${userId}`}>

                <h2 className="text-lg font-montserrat font-semibold py-3 text-sky-300">Informações do usuario</h2>

                {divList("Número do pedido:", orderId || "...", "w-full justify-between  pb-2 0 px-10")}
                {divList("Nome do usuario:", name, "w-full justify-between  pb-2 0 px-10")}
                {divList("Endereço:", houseAddress, "w-full justify-between  pb-2 0 px-10")}
                {divList("Telefone:", String(tel), "w-full justify-between  pb-2 0 px-10")}
                {divList("Número da morada:", String(houseNumber), "w-full justify-between  pb-2 0 px-10")}
                {complement && divList("Valor da compra:", complement, "w-full justify-between pb-2  px-10")}
                {divList("Cep:", cep, "w-full justify-between border-b-2 pb-3 border-dashed border-primary-200 px-10")}

                <h2 className="text-lg font-montserrat font-semibold py-3 text-sky-300">Dados da compra</h2>

                {divList("Valor da compra:", price, "w-full justify-between pb-2 px-10")}
                {divList("Estado do pedido:", status, "w-full justify-between pb-2 px-10")}
                {change && divList("Troco para:", change, "w-full justify-between pb-2  px-10")}
                {divList("Data da compra:", purchaseDate, "w-full justify-between pb-2 px-10")}

                {receivedDate && divList("Data de entrega:", receivedDate, "w-full justify-between pb-2 px-10")}

                {divList("Método de pagamento:", paymentMethod, "w-full justify-between pb-2 px-10 border-b-2 border-dashed border-primary-200")}

                <h2 className="text-lg font-montserrat font-semibold py-3 text-sky-300">Produtos</h2>

                <div className="flex flex-col gap-6">
                    {products.map((product, index) => {
                        const { coverPhoto, name, productQtd } = product

                        return <div key={`${name}_${index}`} className="flex gap-4 w-full justify-between border-b pb-2 border-primary-200 ">
                            <span className="w-36 h-36">
                                <img className="w-full h-full object-contain p-2 bg-white rounded-lg" src={coverPhoto} alt={parseAlt(coverPhoto)} />
                            </span>
                            <div className="flex flex-col gap-2 flex-1">
                                <p className="font-lato text-base font-semibold text-secondary-200">{name}</p>
                                <span className="flex self-center mt-auto gap-2">
                                    <p className="font-thin">Quantidade:</p>
                                    <p className="font-bold text-secondary-500">{productQtd}</p>
                                </span>
                            </div>
                        </div>
                    })}
                </div>

            </div>


        </div>
    )
}