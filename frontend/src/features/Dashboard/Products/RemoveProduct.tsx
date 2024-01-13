
import { useState } from "react"
import AllProducts from "./components/AllProducts"
import { ProductType } from "../../../types"
import { axiosRequest, toast } from "../../../components"
import { motion } from "framer-motion"

export default function RemoveProduct() {
    const inputClass = `block py-2.5 ps-2 pe-0 w-full text-sm md:text-base text-white bg-transparent border-primary-200 border-b border-gray-300 appearance-none focus:outline-none
    focus:ring-0 focus:border-secondary-600 peer`

    const labelClass = `absolute text-sm md:text-base text-white text-opacity-50 duration-300 transform -translate-y-7 translate-x-1 scale-75 top-3 pointer-events-none origin-[0] 
    peer-placeholder-shown:start-2 peer-focus:start-0 peer-focus:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
    peer-focus:scale-75 peer-focus:-translate-y-7 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`

    const [query, setQuery] = useState<string>("")
    const [form, setForm] = useState<ProductType>()
    const [visible, setVisible] = useState<boolean>(false)

    const handleRemove = async () => {
        try {
            if (!form?._id) return toast.error("Algo deu errado.")
            await axiosRequest.removeProduct(form?._id)
            toast.success("Produto removido com sucesso!")
            setVisible(false)
        } catch (error) {
            toast.error("Algo deu errado :(")
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="relative w-4/5 self-center mt-5">
                <input type="text" className={inputClass} value={query} onChange={(e) => setQuery(e.target.value)} placeholder=" " required />
                <label className={labelClass}>pesquisa</label>
            </div>

            <AllProducts query={query} action="Remover" setForm={setForm} setVisible={setVisible} />

            {visible && <div onClick={() => setVisible(false)} className="w-full max-w-[1523px] h-full top-0 flex justify-center fixed backdrop-brightness-50">
                <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} onClick={(e) => e.stopPropagation()} className=" w-full bg-primary sticky top-0 h-40 text-white items-center
                 pt-3 flex flex-col">
                    <span className="flex flex-col gap-6 items-center">
                        <p className="font-anton font-semibold lg:text-lg">Calma la meu patrão🖐️</p>
                        <p className="font-lato text-lg lg:text-xl">Deseja realmente deletar o produto ??</p>
                    </span>
                    <span className="mt-auto flex gap-2 w-full ">
                        <button onClick={() => setVisible(false)} className="p-2 font-lato flex-1 font-bold bg-sky-700 rounded-tr-lg">Não</button>
                        <button onClick={handleRemove} className="p-2 font-lato flex-1 font-bold bg-secondary-700 rounded-tl-lg">Sim</button>
                    </span>
                </motion.div>

            </div>}
        </div>
    )
}