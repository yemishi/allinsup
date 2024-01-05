import { SetStateAction, useState } from "react";
import { Slide, Slider, SliderProps } from "../../../../components"
import { parseAlt, parseLocalCurrency } from "../../../../utils"
import { NewProductType } from "../types"

interface PropsType {
    form: NewProductType
    setForm: React.Dispatch<SetStateAction<NewProductType>>;
}

export default function Variants({ form, setForm }: PropsType) {

    const settings: SliderProps = {
        spaceBetween: 20,
        slidesPerView: "auto",
        style: {
            width: "100%"
        }
    };

    const [newPhoto, setNewPhoto] = useState<string>("")
    const inputClass = `block py-2.5 ps-2 pe-0 w-full text-sm text-white bg-transparent border-primary-200 border-b border-gray-300 appearance-none focus:outline-none
    focus:ring-0 focus:border-secondary-600 peer`

    const labelClass = `absolute text-sm text-white text-opacity-50 duration-300 transform -translate-y-7 translate-x-1 scale-75 top-3 pointer-events-none origin-[0] 
    peer-placeholder-shown:start-2 peer-focus:start-0 peer-focus:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
    peer-focus:scale-75 peer-focus:-translate-y-7 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`

    const handleVariantChange = (variantIndex: number, field: string, value: string) => {
        const updatedVariants = [...form.variants];

        updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            [field]: value
        };
        setForm({
            ...form,
            variants: updatedVariants
        });
    };
    const removePhoto = (photoIndex: number, variantIndex: number) => {
        setForm(prevForm => {
            const updatedVariants = prevForm.variants.map((variant, index) => {
                if (index !== variantIndex) {
                    return variant;
                }
                return {
                    ...variant,
                    photos: variant.photos.filter((_, idx) => idx !== photoIndex)
                };
            });

            return {
                ...prevForm,
                variants: updatedVariants
            };
        });
    };
    const handleVariantPhoto = (index: number, value: string) => {
        const updatedVariants = [...form.variants];
        const currentPhotos = updatedVariants[index]?.photos || [];

        updatedVariants[index] = {
            ...updatedVariants[index],
            photos: [...currentPhotos, value]
        };
        setForm({ ...form, variants: updatedVariants });
    };

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

    const removeVariant = (variantIndex: number) => {
        const updatedVariants = form.variants.filter((_, index) => index !== variantIndex)
        setForm({ ...form, variants: updatedVariants })
    }
    return (
        form.variants.map((variant, variantIndex) => {
            const { flavor, photos } = variant

            return <div className="flex flex-col gap-6 border-t border-primary-200 mb-5 bg-primary-500 px-6 py-4 relative" key={`${variant}_${variantIndex}`}>
                <button onClick={(e) => { e.preventDefault(), removeVariant(variantIndex) }} className="absolute right-0 top-0 bg-primary px-2 py-1 rounded-bl-lg ">X</button>
                <h4 className="font-anton text-base">{`Variant N°${variantIndex + 1}`}</h4>
                <div className="relative w-3/6">
                    <input type="text" className={inputClass} value={flavor} onChange={(e) => handleVariantChange(variantIndex, "flavor", e.target.value)}
                        placeholder=" " required />
                    <label className={labelClass}>Sabor do produto</label>

                </div>


                <div className="flex gap-6 ">
                    <div className="relative w-full">
                        <input type="text" className={inputClass} onChange={(e) => setNewPhoto(e.target.value)} placeholder=" " />
                        <label className={labelClass}>Url da imagem</label>

                    </div>
                    <button className="bg-primary border border-primary-200 px-3 py-2 rounded-lg font-anton font-bold" onClick={(e) => { e.preventDefault(), handleVariantPhoto(variantIndex, newPhoto) }}>Adicionar</button>
                </div>

                {photos.length > 0 && <div className="flex flex-col rounded-lg w-full gap-4">

                    <h4 className="font-anton font-bold text-secondary-200">{`Total de imagens: ${photos.length}`}</h4>
                    <Slider settings={settings} >
                        {photos.map((photo, photoIndex) => (

                            <Slide key={`${photo}_${photoIndex}`} className="!w-40 bg-primary relative pt-2 rounded-lg  !flex flex-col gap-3 ">
                                <p className="text-sm font-lato font-bold ml-2">{`Imagem n°${photoIndex + 1}`}</p>
                                <button onClick={(e) => { e.preventDefault(), removePhoto(photoIndex, variantIndex) }}
                                    className="absolute top-0 right-0 w-6 h-6 font-anton font-bold text-xs border-t border-r
                                  border-primary bg-primary-500 text-rose-600 rounded-bl-lg rounded-tr-lg">X</button>
                                <img src={photo} className="object-contain !h-48 p-4 bg-white rounded-lg" alt={parseAlt(photo)} />
                            </Slide>
                        ))}
                    </Slider>
                </div>}

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

            </div>
        })
    )
}