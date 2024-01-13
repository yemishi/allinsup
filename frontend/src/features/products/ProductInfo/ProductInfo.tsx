import { useState } from "react";
import { ProductType } from "../../../types";
import { productDetails, parseAlt, parseLocalCurrency, slideOptions } from "../../../utils";
import { Slide, Slider, SliderProps, toast } from "../../../components";
import { useGlobalState } from "../../../App";
import { useNavigate } from "react-router-dom";
import SimilarProduct from "../Similar/SimilarProducts";

import Swiper from "swiper";


export default function ProductInfo({ product, q }: { product: ProductType, q: string }) {
    const navigate = useNavigate()
    const { dispatch, state } = useGlobalState()
    const [variantIndex, setVariantIndex] = useState<number>(0)
    const [sizeIndex, setSizeIndex] = useState<number>(0)
    const { _id, sizeDetails, variants, flavor, name, photos, price, sizeProduct, desc, stock, updatedName, promotion } = productDetails(product, state.cart, variantIndex, sizeIndex)
    const [amount, setAmount] = useState<number>(1)
    const [activeThumb, setActiveThumb] = useState<null | Swiper>()

    product.updatedName = `${name} ${flavor} ${sizeProduct}`

    const valueSave = (Number(promotion) - Number(price))
    const handleAmount = (e: number) => {
        if (e >= stock) e = stock
        if (!e) e = 1
        setAmount(e)
    }

    const incrementAmount = () => {
        if (amount + 1 <= stock) setAmount((value) => value + 1)
        else setAmount(stock)
    }

    const decrementAmount = () => {
        if ((amount - 1) > 0) setAmount((value) => value - 1)
        else setAmount(1)
    }

    const addInCart = () => {
        if (!stock) return toast.error("Produto fora do estoque")
        if (amount > stock) return toast.error("Não foi possível adicionar o produto. A quantidade pedida não está disponível.")
        else {
            dispatch({ type: "UPDATE_PRODUCT_AMOUNT", payload: { amount, product: product.toCart } })
        }
    }
    const flashPurchase = () => {
        if (amount > stock) return toast.error("Não foi possível adicionar o produto. A quantidade pedida não está disponível.")
        dispatch({ type: "UPDATE_PRODUCT_AMOUNT", payload: { amount, product: product.toCart } })
        navigate('/checkout/review')
    }

    const perGram = () => {
        const grams = sizeProduct.replace(/\D/g, "")
        const isKg = sizeProduct.toLowerCase().includes('kg')

        const totalGrams = isKg ? parseInt(grams) * 1000 : parseInt(grams)
        const total = promotion ? promotion / totalGrams : price / parseInt(grams)
        if (Number.isNaN(total)) return null

        return `(${parseLocalCurrency(total)} / Grama)`
    }

    const minTablet = window.matchMedia("(min-width:768px)").matches
    const minLaptop = window.matchMedia("(min-width:1024px)").matches

    const settings: SliderProps = {
        spaceBetween: 40,
        slidesPerView: 1,
        ...(activeThumb && activeThumb.destroyed !== undefined && activeThumb.destroyed !== null && !activeThumb.destroyed && { thumbs: { swiper: activeThumb } }),

        style: {
            padding: '14px',
            borderRadius: '8px',
            background: 'white',
            width: "100%",
            height: "340px",
            ...(minTablet && { position: "sticky", top: 0, height: "380px" }),
            ...(minLaptop && { height: "490px" }),

        },
        pagination: true,
        navigation: minTablet,
        breakpoints: {
            768: {
                effect: "fade"
            },
            1024: {
                allowTouchMove: false
            }
        }
    };

    const thumbSettings: SliderProps = {
        onSwiper: setActiveThumb,
        slidesPerView: "auto",
        direction: "vertical",
        spaceBetween: 10,
        style: {
            position: "sticky",
            top: 0,
            width: "20%",
            height: "100%",
            ...(minLaptop && { width: "10%" }),

        },
        thumbs: {
            slideThumbActiveClass: "thumb-active"
        }

    };
    return <div key={`${_id} ${updatedName}`} className="text-white l w-full rounded-lg  gap-6 flex flex-col">

        <div className="flex flex-col gap-6 pb-6 w-full p-4 bg-primary-500 rounded-md md:flex-row">

            {!minTablet && <h1 className="font-lato text-xl text-white font-medium" onClick={() => setVariantIndex((1))}>{updatedName}</h1>}

            {minTablet && <Slider settings={thumbSettings}>
                {photos.map((e, i) => (
                    <Slide key={`${e}_${i}`} className="!h-16 cursor-pointer !w-full bg-white rounded-lg sticky top-0 p-1">
                        <img src={e} alt={parseAlt(e)} className="object-contain w-full h-full p-2 hover:scale-105 duration-300 " />
                    </Slide>
                ))}
            </Slider>}

            <Slider settings={settings}>
                {photos.map((e, i) => (
                    <Slide key={`${e}_${i}`} className=" ">
                        <div className="h-[340px] w-full md:h-full">
                            <img src={e} alt={parseAlt(e)} className="object-contain  p-4 hover:scale-105 duration-300 w-full h-full " />
                        </div>
                    </Slide>
                ))}
            </Slider>


            <div className="flex flex-col gap-4 md:gap-6  md:min-w-[38%] lg:w-[35%] md:max-w-[28%]">

                {minTablet && <h1 className="font-lato text-xl text-white font-medium md:text-2xl lg:text-3xl" onClick={() => setVariantIndex((1))}>{updatedName}</h1>}

                <span className="flex gap-3 items-center md:gap-0">
                    <span className="flex flex-col">
                        <p className="text-2xl lg:text-3xl font-bold text-secondary-500 font-lato">
                            {promotion ? parseLocalCurrency(promotion) : parseLocalCurrency(price)}
                        </p>
                        <p className="font-lato text-opacity-70 text-sm lg:text-lg text-white md:mt-1">{perGram()}</p>
                    </span>


                    <div className="flex ml-3 mt-auto gap-4 md:mt-0 md:flex-col md:gap-2">

                        {promotion && <p className="font-anton line-through font-semibold mt-auto">{parseLocalCurrency(price)}</p>}
                        {promotion && <p className="bg-secondary-200 text-black font-semibold font-anton text-xs p-2 rounded-md mb-5 md:mb-0 md:text-sm md:p-1">{parseLocalCurrency(valueSave)}</p>}
                    </div>
                </span>

                {minLaptop && <div className="flex flex-col gap-4 w-full px-2 py-2">
                    {slideOptions(variants, { setState: setVariantIndex, selected: "flavor", state: variantIndex, title: "Sabor" })}
                    {slideOptions(sizeDetails, { setState: setSizeIndex, selected: "sizeProduct", state: sizeIndex, title: "Tamanho" })}
                </div>}

                <div className={`flex gap-4 justify-between md:flex-col md:gap-6 lg:flex-row ${stock === 0 && "grayscale"}`}>
                    <span className="grid grid-cols-3 gap-4 border border-opacity-40 w-[45%] border-white lg:max-h-16   px-4 py-2 max-h-14 rounded-md md:w-full">

                        <button className={`${!stock && "pointer-events-none"} `} onClick={decrementAmount} >
                            <svg className="stroke-white max-h-9 lg:max-h-11 hover:stroke-secondary-500 duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" ></path> </g></svg>
                        </button>

                        <input onChange={(e) => handleAmount(parseInt(e.target.value))} value={amount} placeholder={String(amount)} inputMode="decimal" type="number" name="amountItem"
                            className="bg-transparent max-h-9 lg:max-h-11  outline-none text-center placeholder:text-white font-anton text-base md:text-lg lg:text-xl" />

                        <button className={`${!stock && "pointer-events-none"}`} onClick={incrementAmount}>
                            <svg className="max-h-9 lg:max-h-11 ml-auto fill-white hover:stroke-secondary-500 hover:fill-secondary duration-300" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H7.53v4.152a1.03 1.03 0 0 1-2.058 0v-4.152H1.318a1.03 1.03 0 1 1 0-2.059h4.153V4.001a1.03 1.03 0 0 1 2.058 0v4.152h4.153a1.03 1.03 0 0 1 1.029 1.03z"></path></g></svg>
                        </button>
                    </span>

                    <button onClick={addInCart} className="bg-secondary-600 hover:bg-secondary-700 duration-300 w-[55%] max-h-16 rounded flex items-center justify-center 
                    md:w-full md:rounded-full md:border md:border-white  md:p-3">
                        <span className="flex gap-2 text-sm lg:text-lg items-center font-anton font-semibold">
                            <svg style={{ strokeLinecap: 'round' }} className="stroke-white w-5 lg:w-8 stroke-[1.5] hover:stroke-[#fb923c] duration-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g>
                                <g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier">
                                    <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"></path>
                                    <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"        ></path>
                                    <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                                    ></path> </g>
                            </svg>
                            Adicionar
                        </span>
                    </button>
                </div>

                <div className={`flex justify-center items-center bg-sky-400 hover:bg-sky-600 duration-300  w-full p-2 rounded 
                ${stock === 0 && "grayscale"} font-anton font-semibold md:p-3 lg:mt-auto lg:text-lg lg:py-4`}>
                    <button onClick={flashPurchase} className="">Comprar agora</button>
                </div>
            </div>
        </div>

        <span className="border-l-4 border-secondary-600 flex items-center justify-between md:py-1 md:border-l-[6px] lg:hidden">
            <h3 className="font-lato font-semibold text-lg ml-1 md:text-xl">Detalhes do produto</h3>
        </span>

        <div className="flex flex-col gap-4 w-full px-4 py-2 bg-primary-500 rounded-md lg:hidden">
            {slideOptions(variants, { setState: setVariantIndex, selected: "flavor", state: variantIndex, title: "Sabor selecionado:" })}
            {slideOptions(sizeDetails, { setState: setSizeIndex, selected: "sizeProduct", state: sizeIndex, title: "Tamanho selecionado:" })}
        </div>
        <span className="border-l-4 border-secondary-600 flex items-center justify-between md:py-1 md:border-l-[6px]">
            <h3 className="font-lato font-semibold text-lg ml-1 md:text-xl lg:text-2xl">Informações sobre o produto</h3>
        </span>

        <table className="w-full">
            <tbody className="text-left flex flex-col font-lato text-sm lg:text-xl rounded-2xl md:text-base">
                {desc.map((description, index) => {
                    const { text, title } = description
                    const last = index === desc.length - 1
                    const first = index === 0
                    return <tr key={`${description}_${index}`} className="grid grid-cols-2 first:rounded-tl-lg">
                        <th className={`font-bold bg-primary-550 py-4 lg:py-6 pl-2 lg:pl-4 pr-4 border-b border-gray-500 ${last && "rounded-bl-lg border-none"} ${first && "rounded-tl-lg"}`}>{title}</th>
                        <td className={`font-thin bg-secondary-200 bg-opacity-40 py-4 lg:py-6 pl-2 lg:pl-4 pr-4 border-b  border-gray-500 ${last && "rounded-br-lg border-none"} ${first && "rounded-tr-lg"}`}>{text}</td>
                    </tr>
                })}
            </tbody>
        </table>

        <SimilarProduct q={q} title="Produtos semelhantes" />
    </div >

}