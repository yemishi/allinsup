import { useState } from "react"
import { motion } from "framer-motion"
import { useGlobalState } from "../../App";
import { parseLocalCurrency, totalPrice } from "../../utils";
import { toast } from "react-toastify";


export default function MoneyMethod({ setMoneyState, setPurchaseOpen }: {
    setMoneyState: React.Dispatch<React.SetStateAction<boolean>>,
    setPurchaseOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const { state, dispatch } = useGlobalState()
    const [change, setChange] = useState<string>("");
    const formatToCurrency = (value: number): string => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
    const [changeLabel, setChangeLabel] = useState<string>("Valor em dinheiro")

    const cleanedValue = (inputValue: string) => {
        const cleanedInput = inputValue.replace(/[^\d]/g, '');

        return parseInt(cleanedInput, 10);
    }

    const price = parseLocalCurrency(totalPrice(state.cart))
    const checkValue = cleanedValue(change) > cleanedValue(price)

    const handleInput = (inputValue: string, previousValue: string): string => {
        if (!isNaN(cleanedValue(inputValue))) {
            const newValue = cleanedValue(inputValue) / 100;
            const formattedValue = formatToCurrency(newValue);
            return formattedValue;
        }
        return previousValue;
    };
    const purchase = () => {
        dispatch({ type: "SET_PAYMENT_INFO", payload: { wppMsg: "Olá acabei de fazer um pedido!", extra: { change: "", paymentMethod: "Dinheiro" } } })
        toast.success("Pedido feito com sucesso!")
        setPurchaseOpen(true)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!checkValue) setChangeLabel(`Valor minimo ${price}`)
        else setChangeLabel("Valor em dinheiro")
        setChange(prevValue => handleInput(value, prevValue));
    };

    const purchaseWithChange = () => {
        if (!checkValue || !change) return toast.error("O valor que irá pagar precisa ser maior do que o valor total para haver troco.")
        dispatch({ type: "SET_PAYMENT_INFO", payload: { wppMsg: `Olá acabei de fazer um pedido com troco para ${change}`, extra: { change, paymentMethod: "Dinheiro" } } })
        setPurchaseOpen(true)
    }

    const inputClass = `block py-2.5 ps-7 pe-0 w-full text-sm md:text-base text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none
    focus:ring-0 focus:border-secondary-600 peer`

    const labelClass = `${!checkValue && change ? "text-red-500 peer-focus:text-red-500" : "text-white peer-focus:text-secondary-500"} absolute text-sm md:text-base text-opacity-50 duration-300 transform -translate-y-7 right-0 scale-75 top-3 pointer-events-none  
     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
       peer-focus:scale-75 peer-focus:-translate-y-7`

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setMoneyState(false)} className="w-full h-full fixed self-center backdrop-brightness-50 z-20 flex justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="bg-primary text-gray-200 md:gap-11 w-11/12 md:w-auto h-3/6 md:h-auto rounded-lg text-center gap-2 flex flex-col p-5">

                <h2 className="text-xl font-anton font-semibold px-3">Você escolheu pagar em dinheiro</h2>

                <div className="font-anton font-semibold text-gray-300 text-left flex flex-col  md:text-center md:gap-4 md:self-center">
                    <span className="flex gap-2">
                        <p className="md:text-lg">Valor total:</p>
                        <p className="text-secondary-600 font-bold">{parseLocalCurrency(totalPrice(state.cart))}</p>
                    </span>
                    <p className="font-lato font-semibold text-gray-300 ">precisa de troco?</p>
                </div>


                <div className="relative w-3/6 md:w-auto self-center mt-4">
                    <svg className="w-6 h-6 absolute bottom-2 left-0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M951.87 253.86c0-82.18-110.05-144.14-256-144.14s-256 61.96-256 144.14c0 0.73 0.16 1.42 0.18 2.14h-0.18v109.71h73.14v-9.06c45.77 25.81 109.81 41.33 182.86 41.33 67.39 0 126.93-13.33 171.71-35.64 6.94 7.18 11.15 14.32 11.15 20.58 0 28.25-72.93 70.98-182.86 70.98h-73.12v73.14h73.12c67.4 0 126.96-13.33 171.74-35.65 6.95 7.17 11.11 14.31 11.11 20.6 0 28.27-72.93 71-182.86 71l-25.89 0.12c-15.91 0.14-31.32 0.29-46.34-0.11l-1.79 73.11c8.04 0.2 16.18 0.27 24.48 0.27 7.93 0 16-0.05 24.2-0.12l25.34-0.12c67.44 0 127.02-13.35 171.81-35.69 6.97 7.23 11.04 14.41 11.04 20.62 0 28.27-72.93 71-182.86 71h-73.12v73.14h73.12c67.44 0 127.01-13.35 171.81-35.69 6.98 7.22 11.05 14.4 11.05 20.62 0 28.27-72.93 71-182.86 71h-73.12v73.14h73.12c145.95 0 256-61.96 256-144.14 0-0.68-0.09-1.45-0.11-2.14h0.11V256h-0.18c0.03-0.72 0.2-1.42 0.2-2.14z m-438.86 0c0-28.27 72.93-71 182.86-71s182.86 42.73 182.86 71c0 28.25-72.93 70.98-182.86 70.98s-182.86-42.73-182.86-70.98z" fill="#ffffff"></path><path d="M330.15 365.71c-145.95 0-256 61.96-256 144.14 0 0.73 0.16 1.42 0.18 2.14h-0.18v256c0 82.18 110.05 144.14 256 144.14s256-61.96 256-144.14V512h-0.18c0.02-0.72 0.18-1.42 0.18-2.14 0-82.18-110.05-144.15-256-144.15zM147.29 638.93c0-6.32 4.13-13.45 11.08-20.62 44.79 22.33 104.36 35.67 171.78 35.67 67.39 0 126.93-13.33 171.71-35.64 6.94 7.18 11.15 14.32 11.15 20.58 0 28.25-72.93 70.98-182.86 70.98s-182.86-42.72-182.86-70.97z m182.86-200.07c109.93 0 182.86 42.73 182.86 71 0 28.25-72.93 70.98-182.86 70.98s-182.86-42.73-182.86-70.98c0-28.27 72.93-71 182.86-71z m0 400.14c-109.93 0-182.86-42.73-182.86-71 0-6.29 4.17-13.43 11.11-20.6 44.79 22.32 104.34 35.66 171.75 35.66 67.4 0 126.96-13.33 171.74-35.65 6.95 7.17 11.11 14.31 11.11 20.6 0.01 28.26-72.92 70.99-182.85 70.99z" fill="#ffffff"></path></g></svg>
                    <input value={change} onChange={handleChange} type="text" placeholder=" " className={inputClass} />
                    <label className={labelClass}>{changeLabel}</label>
                </div>
                <span className=" w-full self-center mt-auto flex justify-around gap-5 font-lato font-semibold">
                    <button onClick={purchase} className="bg-sky-500 p-2 rounded-lg flex-1">não</button>
                    <button onClick={purchaseWithChange} className="bg-secondary-700 p-2 rounded-lg flex-1">sim</button>
                </span>
            </div>
        </motion.div>
    )
}