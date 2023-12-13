import axios, { AxiosInstance } from "axios";
import { ProductType } from "../types";



interface ProductsType {
    data: ProductType[]
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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