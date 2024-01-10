import { motion } from "framer-motion"
import { ProductType } from "../../../../types"
import { SetStateAction, useState } from "react"
import { inputField } from "../utils/templates"
import Variants from "./Variants"
import { NewProductType, NewVariantType } from "../types"
import Description from "./Description"
import { DivDraggable, axiosRequest, toast } from "../../../../components"

export default function EditProductPanel({ form, setForm, setVisible }: {
    form: NewProductType, visible: boolean,
    setForm: React.Dispatch<SetStateAction<NewProductType>>, setVisible: React.Dispatch<SetStateAction<boolean>>
}) {

    const handleValue = (element: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = element.target
        setForm({ ...form, [name]: value })
    }
    const [directionDrag, setDirectionDrag] = useState<"100%" | "-100%">("100%")
    const [open, setOpen] = useState<boolean>(true)

    const variantsParent = {
        open: { opacity: 1 },
        exit: { opacity: 0, transition: { delay: 0.3 } }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const { _id } = form as ProductType
            await axiosRequest.updateProduct(_id, form as ProductType)
            toast.success("produto atualizado com sucesso!")
            setVisible(false)
        } catch (error) {
            toast.error("algo deu errado :(")
        }
    }
    return (
        <motion.div onClick={() => setVisible(false)} className="flex flex-col w-screen absolute h-full backdrop-brightness-50 " variants={variantsParent}
            animate={open ? 'open' : 'exit'}>

            <DivDraggable directionDrag={directionDrag} initialDirection="-100%" classAddition="md:w-full" setDirectionDrag={setDirectionDrag}
                setState={setOpen} state={open} closeParent={() => setVisible(false)} >
                <form onSubmit={handleSubmit} className="w-full text-gray-300  font-anton flex flex-col pb-2 pt-6 bg-primary-600 items-center gap-6" >

                    <button onClick={(e) => { e.preventDefault(), setVisible(false) }}
                        className="hidden md:block absolute top-0 right-0 w-11 h-11 font-anton font-bold text-lg border-t border-r
                                  border-primary bg-primary-500 text-rose-600 rounded-bl-lg ">X</button>

                    <h2 className="hidden md:block text-secondary-100 font-semibold my-4 text-lg">{form.name}</h2>

                    <div className="flex flex-col px-6 gap-6 w-full items-center">

                        {inputField({ name: "name", onChange: handleValue, value: form.name })}
                        {inputField({ name: "category", onChange: handleValue, value: form.category })}
                        {inputField({ name: "brand", onChange: handleValue, value: form.brand })}

                    </div>

                    <Description form={form} setForm={setForm} />

                    <div className="flex flex-col w-full gap- ">
                        <div className="w-full flex justify-between px-4 md:pb-6 items-center text-lg md:text-xl ">
                            <h3 className="font-bold text-secondary-200 ml-2 ">Variants</h3>

                            <button className="h-8 w-8 md:w-11 md:h-11 bg-primary border border-primary-300 font-anton font-bold rounded-full" onClick={(e) => {
                                e.preventDefault()
                                const newVariant: NewVariantType = {
                                    flavor: "Sabor",
                                    photos: [],
                                    sizeDetails: [{ price: 0, sizeHighlight: false, sizeProduct: "Tamanho do produto", stock: 0 }]
                                }
                                setForm({ ...form, variants: [...form.variants, newVariant] })
                            }}>+</button>

                        </div>

                        <Variants form={form} setForm={setForm} />

                    </div>
                    <button type="submit" className="sticky bottom-0 p-2 bg-secondary-700 w-2/5 rounded-md text-white font-bold z-30">Concluir</button>

                </form >
            </DivDraggable>
        </motion.div >
    )
}