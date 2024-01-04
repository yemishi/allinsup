import { useState } from "react"

import { NewProductType, NewVariantType } from "./types";

import { axiosRequest, toast } from "../../../components";
import { inputField } from "./utils/templates";
import Description from "./components/Description";
import Variants from "./components/Variants";

export default function CreateProduct() {

    const initialState: NewProductType = {
        name: "",
        desc: [{ title: "title", text: "text" }],
        category: "",
        brand: "",
        highlight: false,
        variants: [{ flavor: "", photos: [], sizeDetails: [{ price: "", sizeHighlight: false, sizeProduct: "", stock: "" }] }],
    }
    const [form, setForm] = useState<NewProductType>(initialState)

    const handleValue = (element: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = element.target
        setForm({ ...form, [name]: name === "brand" ? value.toLowerCase() : value })
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        form.variants.map((e, i) => {
            if (e.photos.length === 0) {
                e.photos.push("https://smithcodistributing.com/wp-content/themes/hello-elementor/assets/default_product.png")
            }
        })
        try {
            await axiosRequest.newProduct(form)
            toast.success("produto criado com sucesso")
            setForm(initialState)
        } catch (error) {
            toast.error("algo deu errado :(")

        }
    }
    return (
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="w-full text-gray-300  font-anton flex flex-col pb-2 pt-6 bg-primary-600 items-center  gap-6" >

                <div className="flex flex-col px-6 gap-6 w-full items-center">
                    {inputField({ name: "name", onChange: handleValue, value: form.name })}
                    {inputField({ name: "category", onChange: handleValue, value: form.category })}
                    {inputField({ name: "brand", onChange: handleValue, value: form.brand })}
                </div>

                <Description form={form} setForm={setForm} />

                <div className="flex flex-col w-full gap- ">
                    <div className="w-full flex justify-between px-4 ">
                        <h3 className="font-bold text-lg text-secondary-200 ml-2 mb-6">Variants</h3>

                        <button className="h-8 w-8 bg-primary border border-primary-300 font-anton font-bold text-lg rounded-full" onClick={(e) => {
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
                <button type="submit" className="sticky bottom-0  p-2 bg-secondary-700 w-2/5 rounded-md text-white font-bold z-30">Concluir</button>

            </form >

        </div >
    )
}