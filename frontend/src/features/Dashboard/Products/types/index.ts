export interface NewSizesType {
    sizeProduct: string,
    price: number | "",
    stock: number | "",
    sizeHighlight: boolean
    promotion?: number,
}

export interface NewVariantType {
    flavor: string,
    photos: string[],
    sizeDetails: NewSizesType[],
}

export interface DescType {
    title: string,
    text: string
}

export interface NewProductType {
    name: string,
    desc: DescType[],
    highlight?: number | Boolean,
    category: string,
    brand: string,
    variants: NewVariantType[]
}
