import { SetStateAction } from "react"
import { NewProductType } from "../types"

interface PropsType {
    form: NewProductType
    setForm: React.Dispatch<SetStateAction<NewProductType>>;
}

export default function Description({ setForm, form }: PropsType) {

    const handleDescChange = (index: number, field: string, value: string) => {
        const updatedDesc = [...form.desc]
        updatedDesc[index] = {
            ...updatedDesc[index],
            [field]: value
        }

        setForm({ ...form, desc: updatedDesc })
    };
    const removeDesc = (index: number,) => {
        const updateDesc = form.desc.filter((_, descIndex) => index !== descIndex)
        setForm({ ...form, desc: updateDesc })
    }

    return (
        <div className="w-full flex flex-col justify-between px-6 gap-6 bg-primary-500 py-3">
            <span className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-secondary-200 md:text-xl">Descrição</h3>
                <button className="h-8 w-8 md:w-11 md:h-11 md:text-xl hover:bg-primary-600 duration-200 bg-primary border 
                border-primary-300 font-anton font-bold text-lg rounded-full" onClick={(e) => {
                        e.preventDefault()
                        setForm({ ...form, desc: [...form.desc, { title: "Title", text: "Text" }] })
                    }}>+</button>
            </span>


            {form.desc && <table className="w-full mt-2">
                <tbody className="text-left flex flex-col font-lato text-sm md:text-base rounded-2xl">
                    {form.desc.map((description, index) => {
                        const { text, title } = description
                        const last = index === form.desc.length - 1
                        const first = index === 0
                        return <tr key={`${description}_${index}`} className="grid grid-cols-2 w-full first:rounded-tl-lg relative">
                            <td className={`${last && "rounded-bl-lg border-none"} ${first && "rounded-tl-lg"} border-b border-b-primary-200
                             bg-primary-550 md:py-5 pl-2 pr-4 py-3 `}>

                                <button onClick={(e) => { e.preventDefault(), removeDesc(index) }} className={`absolute right-0  
                               top-0 bg-primary w-6 h-6 md:w-8 md:h-8 hover:bg-primary-600 duration-200 font-lato text-white 
                               text-sm md:text-base rounded-bl-lg font-extrabold z-20 
                               
                               ${last && "rounded-bl-lg "} ${first && "rounded-tr-lg"}`}>
                                    x
                                </button>

                                <input
                                    value={title}
                                    onChange={(e) => handleDescChange(index, 'title', e.target.value)}
                                    type="text"
                                    className="outline-none font-bold bg-transparent w-full"
                                />
                            </td>

                            <td className={`relative bg-secondary-200 flex pl-2   bg-opacity-40 border-b border-b-primary-200  ${last && "rounded-br-lg border-none"} ${first && "rounded-tr-lg"}`} >
                                <input
                                    value={text}
                                    onChange={(e) => handleDescChange(index, 'text', e.target.value)}
                                    type="text"
                                    className={`outline-none  font-thin  bg-transparent w-full md:pr-9`}
                                />

                            </td>
                        </tr>
                    })}
                </tbody>
            </table>}
        </div>
    )
}