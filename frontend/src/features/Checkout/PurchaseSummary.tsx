import { useGlobalState } from "../../App"
import { useQuery } from "react-query"
import { axiosRequest, toast } from "../../components"
import { useNavigate } from "react-router-dom"

import { totalPrice, parseLocalCurrency } from "../../utils"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function PurchaseSummary() {
    const { state, dispatch } = useGlobalState()
    const products = state.cart.map((e) => {
        return {
            productId: e._id, productQtd: e.amount, flavor: e.flavor, sizeProduct: e.sizeProduct, coverPhoto: e.coverPhoto,
            name: e.updatedName, productPrice: parseLocalCurrency(e.price)
        }
    })

    const { extra, wppMsg, isPix } = state.paymentInfo
    const navigate = useNavigate()
    const [price, setPrice] = useState<string>("")


    useEffect(() => {
        if (!state.cart.length) {
            toast.error('Algo deu errado, tente novamente.')
            return navigate('/checkout/payment')
        }
        setPrice(parseLocalCurrency(totalPrice(state.cart)))
    }, [])

    const { data } = useQuery('newOrder', async () => {
        const response = await axiosRequest.newOrder(parseLocalCurrency(totalPrice(state.cart)), products, extra);
        dispatch({ type: "RESET_CART" });
        return response.data;
    });

    const msg = `${encodeURIComponent(wppMsg || "")}%0AEncomenda%20Nº${data?.orderId.toUpperCase()}`;
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText("53.065.683/0001-21")
            .then(() => {
                toast.info('Chave copiada para a área de transferência!')
            })
            .catch(() => {
                toast.error('Não foi possível copiar a chave.');
            });
    };

    return (
        <div className="w-full h-full items-center py-8 flex flex-col absolute backdrop-brightness-50 text-white bg-primary z-20 pb-0">
            <span className="flex flex-col items-center gap-3 px-11 text-center">
                <svg version="1.1" className="fill-none w-20 border-2 rounded-full border-secondary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <circle className="fill-[#25AE88];" cx="25" cy="25" r="25"></circle> <polyline style={{ strokeWidth: '2px' }} className="fill-none stroke-secondary-600 " points=" 38,15 22,33 12,25 "></polyline> </g></svg>
                <p className="font-anton text-secondary-600 text-lg font-thin">{data?.msg}</p>
            </span>
            <div className="mt-10 bg-primary-500 w-full p-6 flex flex-col justify-center gap-4">

                {isPix && <div className="flex flex-col gap-2">
                    <p className="font-lato font-semibold text-secondary-200 text-center">Chave Pix para pagamento</p>
                    <span className="flex relative gap-2 font-anton font-bold text-base p-3 border-2 rounded-lg border-secondary-700 bg-primary-600">
                        <p className="text-secondary-600">CNPJ:</p>
                        <p className="font-thin">53.065.683/0001-21</p>
                        <button onClick={copyToClipboard} className="ml-auto font-mono text-sm absolute right-0 top-0 h-full px-4 
                         rounded-r-md bg-secondary-700 ">Copiar</button>
                    </span>
                </div>}

                <div className="flex flex-col gap-2">
                    {isPix && <p className="font-lato font-semibold text-secondary-200 text-center">O comprovante do pix precisa ser enviado</p>}
                    <a href={`https://api.whatsapp.com/send?phone=${import.meta.env.VITE_PHONE_NUMBER}&text=${msg}`} className="flex gap-2 font-mono
                         items-end font-semibold text-base p-3 border-2  rounded-lg border-green-600 text-green-500 bg-primary-600">
                        <svg className="w-7 h-7" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" stroke="#CCCCCC" ></g><g id="SVGRepo_iconCarrier"> <path className="fill-[#EDEDED]" d="M0,512l35.31-128C12.359,344.276,0,300.138,0,254.234C0,114.759,114.759,0,255.117,0 S512,114.759,512,254.234S395.476,512,255.117,512c-44.138,0-86.51-14.124-124.469-35.31L0,512z"></path> <path className="fill-[#55CD6C]" d="M137.71,430.786l7.945,4.414c32.662,20.303,70.621,32.662,110.345,32.662 c115.641,0,211.862-96.221,211.862-213.628S371.641,44.138,255.117,44.138S44.138,137.71,44.138,254.234 c0,40.607,11.476,80.331,32.662,113.876l5.297,7.945l-20.303,74.152L137.71,430.786z"></path> <path className="fill-[#FEFEFE]" d="M187.145,135.945l-16.772-0.883c-5.297,0-10.593,1.766-14.124,5.297 c-7.945,7.062-21.186,20.303-24.717,37.959c-6.179,26.483,3.531,58.262,26.483,90.041s67.09,82.979,144.772,105.048 c24.717,7.062,44.138,2.648,60.028-7.062c12.359-7.945,20.303-20.303,22.952-33.545l2.648-12.359 c0.883-3.531-0.883-7.945-4.414-9.71l-55.614-25.6c-3.531-1.766-7.945-0.883-10.593,2.648l-22.069,28.248 c-1.766,1.766-4.414,2.648-7.062,1.766c-15.007-5.297-65.324-26.483-92.69-79.448c-0.883-2.648-0.883-5.297,0.883-7.062 l21.186-23.834c1.766-2.648,2.648-6.179,1.766-8.828l-25.6-57.379C193.324,138.593,190.676,135.945,187.145,135.945"></path> </g></svg>
                        <p>Envie uma mensagem</p></a>
                    <p className="font-lato font-semibold text-secondary-200 text-center">{`Valor a ser pago: ${price}`}</p>

                </div>

            </div>

            <div className="grid grid-cols-2 mt-auto w-full font-anton font-bold  text-gray-200 text-center ">
                <Link className="bg-sky-500 p-3 rounded-md flex-1" to={`/orderInfo/${data?.orderId}`}>Ver pedido</Link>
                <Link className="bg-secondary-600 p-3 rounded-md flex-1" to={'/'}>Inicio</Link>

            </div>
        </div >
    )
}