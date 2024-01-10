import { Variants } from "framer-motion"
import { CartType, ProductType, SizesType, VariantType } from "../types"

export const stickyVariant: Variants = {
    sticky: { top: 0, position: 'sticky', transition: { type: 'spring', damping: 20, stiffness: 100 } },
    noSticky: { top: '-100%', position: 'sticky', transition: { type: 'spring', damping: 200, stiffness: 100 }, }
}
interface productDetailsType {
    _id: string,
    name: string,
    updatedName: string,
    flavor: string,
    coverPhoto: string,
    sizeProduct: string,
    price: number,
    stock: number,
    category: string
    urlName: string
    photos: string[]
    promotion?: number,
    amount?: number,
    desc: { title: string, text: string }[]
    variants: VariantType[],
    sizeDetails: SizesType[]
}

export const findInArray = (array: SizesType[] | VariantType[], state?: number) => {

    if (state !== undefined && array[state]) return array[state]
    else return array.find((variant) => (variant.isSelected === true)) || array[0]

}

export const productDetails = (product: ProductType, cart: CartType[], variantIndex?: number, sizeIndex?: number): productDetailsType => {
    const { _id, name, variants, category, desc } = product

    const { flavor, sizeDetails, photos } = findInArray(variants, variantIndex) as VariantType

    const { sizeProduct, price, stock, promotion } = findInArray(sizeDetails, sizeIndex) as SizesType


    product.toCart = {
        _id, coverPhoto: photos[0], flavor, name, updatedName: `${name} ${flavor} ${sizeProduct}`, price, sizeProduct, stock, promotion, amount: 0, category
    }

    const amount: number | undefined = cart.find((detail) => detail._id === _id && detail.flavor === flavor && detail.sizeProduct === sizeProduct)?.amount
    const urlName = `${name}-${flavor}-${sizeProduct}`
    return {
        _id, name, flavor, coverPhoto: photos[0], desc, photos, sizeProduct, price, stock, promotion, updatedName: `${name} ${flavor} ${sizeProduct}`, amount, category, urlName, variants, sizeDetails
    }
}

export const logoCloseEvent = (fnc?: () => void, classAdditional?: string): JSX.Element => {
    return <div onClick={fnc} className="text-white text-center cursor-pointer  flex flex-col items-center duration-300 gap-1">
        <p onClick={fnc} style={{ borderImage: 'linear-gradient(to right, transparent, rgb(255 144 70),transparent) 1' }}
            className={`${classAdditional ? classAdditional : ""} cursor-pointer font-montserrat text-2xl leading-6 py-1 
             border-y-2 duration-300 hover:px-10 px-7 text-center font-extrabold `}>ALL IN</p>
        <p className="text-orange-400 text-sm leading-3 font-mono font-semibold">SUPLEMENTOS</p>
    </div>
}


export const reloadPage = () => {
    window.location.reload();
};



