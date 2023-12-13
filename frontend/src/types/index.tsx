interface SizesType {
    sizeProduct: string,
    price: number,
    stock: number,
    sizeHighlight: boolean
    promotion?: number
}

interface VariantType {
    flavor: string,
    sizeDetails: SizesType[],
}

export interface ProductType {
    _id: string,
    name: string,
    updatedName?: string,
    desc: string,
    mainPhoto: string,
    photos: string[],
    highlight?: number,
    category: string,
    brand: string,
    variants: VariantType[]
}

export interface CartType {
    promotion?: number,
    mainPhoto: string,
    name: string,
    price: number,
    stock: number,
    _id: string,
    amount: number,
    flavor: string,
    sizeProduct: string,
}