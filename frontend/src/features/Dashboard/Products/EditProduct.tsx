import { SetStateAction,  useState } from "react"
import AllProducts from "./components/AllProducts"
import { ProductType } from "../../../types"
import { NewProductType } from "./types"
import EditProductPanel from "./components/EditProductPanel"

export default function EditProduct() {

    const inputClass = `block py-2.5 ps-2 pe-0 w-full text-sm md:text-base text-white bg-transparent border-primary-200 border-b border-gray-300 appearance-none focus:outline-none
    focus:ring-0 focus:border-secondary-600 peer`

    const labelClass = `absolute text-sm md:text-base text-white text-opacity-50 duration-300 transform -translate-y-7 translate-x-1 scale-75 top-3 pointer-events-none origin-[0] 
    peer-placeholder-shown:start-2 peer-focus:start-0 peer-focus:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
    peer-focus:scale-75 peer-focus:-translate-y-7 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`


    const [query, setQuery] = useState<string>("")
    const [visible, setVisible] = useState<boolean>(false)
    const [form, setForm] = useState<ProductType | undefined>()
    return (
        <div className="flex aa flex-col gap-5 h-screen w-full">
            <div className="relative w-4/5 self-center mt-5">
                <input type="text" className={inputClass} value={query} onChange={(e) => setQuery(e.target.value)} placeholder=" " required />
                <label className={labelClass}>pesquisa</label>
            </div>
            <AllProducts query={query} action="Editar" setForm={setForm} setVisible={setVisible} />
            {visible && <div className="fixed top-0 h-full w-full z-30 overflow-hidden ">
                <EditProductPanel visible={visible} setVisible={setVisible} form={form as NewProductType} setForm={setForm as React.Dispatch<SetStateAction<NewProductType>>} /></div>}
        </div>
    )
}