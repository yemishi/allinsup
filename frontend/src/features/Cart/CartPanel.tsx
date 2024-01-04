import { PanInfo, motion, Variants } from "framer-motion"
import { useState, useRef, Dispatch } from "react"
import CartProducts from "./CartProducts"
import { useNavigate } from "react-router-dom"
import { DivDraggable, axiosRequest, toast } from "../../components"
import { totalPrice, totalAmount, parseLocalCurrency, stickyVariant } from "../../utils/"

import { useGlobalState } from "../../App"
import loginRequest from "../User/services/axios.config"

interface PropsType {
    isExisting: boolean;
    setIsExisting: Dispatch<React.SetStateAction<boolean>>;
    handleClose: () => void
}

export default function CartPanel({ isExisting, setIsExisting, handleClose }: PropsType) {
    const navigate = useNavigate()
    const [directionDrag, setDirectionDrag] = useState<"100%" | "-100%">('100%')
    const { dispatch, state } = useGlobalState()

    const [headerPosition, setHeaderPosition] = useState<boolean>(false)
    const initialScrollValue = useRef<number>(0);


    const onScroll = (e: React.UIEvent<HTMLDivElement>): void => {
        const target = e.target as HTMLDivElement;
        const { scrollTop } = target;

        if (scrollTop > initialScrollValue.current) {
            setHeaderPosition(false);
        } else {
            setHeaderPosition(true);
        }
        initialScrollValue.current = scrollTop;
    };

    const sendOrder = async () => {
        try {
            const response = await loginRequest.checkAuth()

            if (response.isAuthenticated) {
                navigate("/checkout/address")
                dispatch({type:"SET_CART_OPEN",payload:false})
            }

            if (!response.isAuthenticated) {
                dispatch({ type: "SET_USER_OPEN", payload: true })
                toast.warning("É preciso fazer login antes")
            }
        } catch (error) {
            toast.error("Oops algo deu errado, tente novamente.")

        }
    }

    return (

        <DivDraggable onScroll={onScroll} directionDrag={directionDrag} state={isExisting} setState={setIsExisting} setDirectionDrag={setDirectionDrag}
            initialDirection={"100%"} closeParent={() => dispatch({ type: "SET_CART_OPEN", payload: false })}>
            <motion.div
                variants={stickyVariant} transition={{ type: "spring", damping: 10, stiffness: 100 }}
                animate={headerPosition ? "sticky" : 'noSticky'} onClick={() => setHeaderPosition(!headerPosition)}
                className="w-full flex top-0 justify-between z-10 flex-col p-5 h-[83px] bg-secondary rounded-b-xl">

                <div className="flex w-full justify-between">

                    <p className="mt-auto font-bold text-xl">Carrinho de Compras</p>

                    <div onClick={handleClose} className="w-7 self-end">
                        <svg className="stroke-white hover:stroke-black cursor-pointer " viewBox="0 0 15 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g>
                            <g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
                            ></path> </g></svg>
                    </div>
                </div>

                <div className="flex text-sm bg-primary-700 p-2 absolute left-0 rounded-r-lg -bottom-8 gap-2 items-center">
                    <p>TOTAL ({totalAmount(state.cart)} items)</p>
                    <p className="text-secondary-500 font-bold text-lg">{parseLocalCurrency(totalPrice(state.cart))}</p>
                </div>
            </motion.div>
            {state.cart.length > 0 ? <CartProducts /> : <div className="p-5 mt-3"><p>O seu carrinho está vazio</p></div>}
            <div className="sticky mt-auto  bg-primary bottom-0 w-full flex justify-center items-center py-4 px-2">
                <button onClick={() => sendOrder()} className="bg-secondary-600 cursor-pointer
                 text-white font-lato py-4 px-6 text-sm font-semibold rounded-xl">FINALIZAR COMPRA</button>

            </div>
        </DivDraggable >


    )

}