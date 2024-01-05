import { SetStateAction } from "react";
import { NewProductType } from "../types";
import { parseLocalCurrency } from "../../../../utils";

interface PropsType {
    form: NewProductType
    setForm: React.Dispatch<SetStateAction<NewProductType>>;
}

export default function SizeDetails({ form, setForm }: PropsType) {

    const inputClass = `block py-2.5 ps-2 pe-0 w-full text-sm text-white bg-transparent border-primary-200 border-b border-gray-300 appearance-none focus:outline-none
    focus:ring-0 focus:border-secondary-600 peer`

    const labelClass = `absolute text-sm text-white text-opacity-50 duration-300 transform -translate-y-7 translate-x-1 scale-75 top-3 pointer-events-none origin-[0] 
    peer-placeholder-shown:start-2 peer-focus:start-0 peer-focus:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
    peer-focus:scale-75 peer-focus:-translate-y-7 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`

    const handleSizeProduct = (variantIndex: number, sizeIndex: number, field: string, value: string | number | boolean) => {
        const updatedVariants = [...form.variants];
        const updatedSize = [...updatedVariants[variantIndex].sizeDetails];

        updatedSize[sizeIndex] = {
            ...updatedSize[sizeIndex],
            [field]: value
        };

        updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            sizeDetails: updatedSize
        };
        if (field === "sizeHighlight") {
            return setForm({
                ...form,
                highlight: value ? variantIndex : false,
                variants: updatedVariants
            })
        }
        setForm({
            ...form,
            variants: updatedVariants
        });
    };

    return (
        <div className="flex flex-col gap-6 border-b mb-2 border-primary-200 bg-primary-500 px-6 py-4">
            {form.variants.map((variant, variantIndex) => {
                return <>
                    {variant.sizeDetails.map((detail, sizeIndex) => {
                        const { price, sizeHighlight, sizeProduct, stock, promotion } = detail
                        return <div className="flex flex-col gap-5" key={`${detail}_${sizeIndex}`}>

                            <div className="relative w-4/6 self-start">
                                <input type="number" className={inputClass} value={price} onChange={(e) => handleSizeProduct(variantIndex, sizeIndex, "price", e.target.value)} placeholder=" " required />
                                <label className={labelClass}>price</label>
                                <p className="absolute right-0 top-0">{parseLocalCurrency(Number(price))}</p>
                            </div>

                            <div className="relative w-4/6 self-start">
                                <input type="text" className={inputClass} value={sizeProduct} onChange={(e) => handleSizeProduct(variantIndex, sizeIndex, "sizeProduct", e.target.value)}
                                    placeholder=" " required />
                                <label className={labelClass}>Tamanho do produto</label>

                            </div>

                            <div className="relative w-4/6 self-start">
                                <input type="number" className={inputClass} value={stock} onChange={(e) => handleSizeProduct(variantIndex, sizeIndex, "stock", e.target.value)}
                                    placeholder=" " required />
                                <label className={labelClass}>Quantidade no estoque</label>
                            </div>

                            <div className="relative w-4/6 self-start">
                                <input type="number" className={inputClass} value={promotion ? promotion : ""} onChange={(e) => handleSizeProduct(variantIndex, sizeIndex, "promotion", e.target.value)}
                                    placeholder=" " />
                                <label className={labelClass}>Promoção ?</label>
                                {promotion && <p className="absolute right-0 top-0">{parseLocalCurrency(Number(promotion))}</p>}
                            </div>

                            <div className="w-4/6 self-start flex gap-2">
                                <span onClick={(e) => { e.preventDefault(), handleSizeProduct(variantIndex, sizeIndex, "sizeHighlight", !sizeHighlight) }}
                                    className={`p-3 cursor-pointer rounded-full border-2 duration-300 border-primary-400 ${sizeHighlight ? "bg-secondary-200 border-secondary-300 shadow-lightOn" : "bg-primary"}`} />
                                <p>Destaque</p>
                            </div>

                        </div>
                    })}
                </>
            })}
        </div>
    )
}