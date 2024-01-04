import { ChangeEvent } from "react"

const inputClass = `block py-2.5 ps-2 pe-0 w-full text-sm text-white bg-transparent border-primary-200 border-b border-gray-300 appearance-none focus:outline-none
    focus:ring-0 focus:border-secondary-600 peer`

const labelClass = `absolute text-sm text-white text-opacity-50 duration-300 transform -translate-y-7 translate-x-1 scale-75 top-3 pointer-events-none origin-[0] 
    peer-placeholder-shown:start-2 peer-focus:start-0 peer-focus:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
    peer-focus:scale-75 peer-focus:-translate-y-7 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`

interface InputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    name: string;
}
export const inputField: React.FC<InputProps> = ({ onChange, value, name }) => {
    const toPt: Record<string, string> = {
        category: "categoria",
        brand: "marca",
        name: "nome",
        default: "campo"
    }
    return (
        <div className="relative w-4/6">
            <input type="text" name={name} className={inputClass} value={value} onChange={onChange} placeholder=" " required />
            <label className={labelClass}>{toPt[name] || toPt.default}</label>
        </div>
    )
}

