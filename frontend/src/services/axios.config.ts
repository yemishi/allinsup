import axios, { AxiosInstance } from "axios";
import { ProductType, UserType } from "../types";

interface ProductsType {
    data: ProductType[]
}
interface ProductInfoType {
    data: ProductType
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

const apiEndPoints = {
    hightLightProducts: '/products/highlight',
    products: (page: number, limit: number) => `/products?page=${page}&limit=${limit}`,
    productsSearch: (query: string, page?: number, limit?: number) => `/products?q=${query}&page=${page}&limit=${limit}`,
    productInfo: (flavor: string, size: string, _id: string) => `/productInfo?flavor=${flavor}&size=${size}&_id=${_id},`,

}

const axiosRequest = {
    highlightProducts: (): Promise<ProductsType> => axiosInstance.get(apiEndPoints.hightLightProducts),
    products: (page: number, limit: number): Promise<ProductsType> => axiosInstance.get(apiEndPoints.products(page, limit)),
    productsSearch: (query: string, page?: number, limit?: number): Promise<ProductsType> => axiosInstance.get(apiEndPoints.productsSearch(query, page, limit)),
    productInfo: (flavor: string, size: string, _id: string): Promise<ProductInfoType> => axiosInstance.get(apiEndPoints.productInfo(flavor, size, _id)),
}

export default axiosRequest