interface SizesType {
    sizeProduct: string,
    price: number,
    stock: number,
    sizeHighlight: boolean
    promotion?: number
}

interface VariantType {
    flavor: string,
    photos: string[],
    sizeDetails: SizesType[],
}

type ToCart = {
    flavor: string,
    _id: string,
    coverPhoto: string,
    promotion?: number,
    name: string,
    price: number,
    sizeProduct: string,
    stock: number
}
export interface ProductType {
    _id: string,
    name: string,
    updatedName?: string,
    desc: string,
    highlight?: number,
    category: string,
    brand: string,
    toCart: ToCart,
    variants: VariantType[]
}

export interface CartType {
    promotion?: number,
    coverPhoto: string,
    name: string,
    price: number,
    stock: number,
    _id: string,
    amount: number,
    flavor: string,
    sizeProduct: string,
}