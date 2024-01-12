export interface SizesType {
    sizeProduct: string,
    price: number,
    stock: number,
    sizeHighlight: boolean
    promotion?: number,
    isSelected?: boolean
}

export interface VariantType {
    flavor: string,
    isSelected?: boolean,
    photos: string[],
    sizeDetails: SizesType[],
}

type descType = {
    title: string,
    text: string
}
export type BrandType = "max titanium" | "growth" | "probiotica" | "integralmédica" | "black skull"

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

export interface OrderType {
    extra: { change?: string, paymentMethod: "Dinheiro" | "Cartão de Crédito" | "Cartão de Débito" | "Pix" }
    products: [{ productId: string, productQtd: number, coverPhoto: string, name: string, productPrice: string }]
    userId: string,
    orderId: string,
    productsIds: string[],
    status: string,
    price: string,
    purchaseDate: string,
    receivedDate: string,
    address: { tel: number, name: string, cep: string, address: string, state: string, city: string, houseNumber: number, complement: string }
}

export interface UpdateOrderType {
    userId?: string,
    orderId?: string,
    status?: string,
    price?: string,
    purchaseDate?: string,
    receivedDate?: string
}