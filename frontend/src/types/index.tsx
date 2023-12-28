export interface SizesType {
    sizeProduct: string,
    price: number,
    stock: number,
    sizeHighlight: boolean
    promotion?: number,
    isSelected: boolean
}

export interface VariantType {
    flavor: string,
    isSelected: boolean,
    photos: string[],
    sizeDetails: SizesType[],
}

type descType = {
    title: string,
    text: string
}

export interface ProductType {
    _id: string,
    name: string,
    updatedName?: string,
    desc: descType[],
    highlight?: number,
    category: string,
    brand: string,
    toCart: CartType,
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
    category: string,
    updatedName: string
}
export type AddressType = {
    name: string,
    tel: string,
    cep: string,
    address: string,
    complement?: string,
    state: string,
    city: string,
    houseNumber: number | ''

}
export interface UserType {
    tel: string,
    _id: string,
    address: AddressType
}