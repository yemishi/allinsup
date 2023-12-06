import axios, { AxiosInstance } from "axios";

export interface ProductType {
    title: string,
    desc: string,
    mainPhoto: string,
    photos: string[],
    category: string,
    hightLight: boolean,
    amount: number,
    price: number,
    options: object[]
    promotion: number

}


interface ProductsType {
    data: ProductType[]
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
})
const apiEndPoints = {
    hightLightProducts: '/products/highlight',
    products: '/products'
}

const axiosRequest = {
    highlightProducts: (): Promise<ProductsType> => axiosInstance.get(apiEndPoints.hightLightProducts),
    products: (): Promise<ProductsType> => axiosInstance.get(apiEndPoints.products),
}

export default axiosRequest