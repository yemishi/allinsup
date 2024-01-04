import axios, { AxiosInstance } from "axios";
import { OrderType, ProductType, UpdateOrderType, UserType } from "../types";
import { NewProductType } from "../features/Dashboard/Products/types";

interface ProductsType {
    data: ProductType[]
}
interface ProductInfoType {
    data: ProductType
}
interface DataUserType {
    data: UserType
}
interface DataOrders {
    data: OrderType[]
}
interface DataOrder {
    data: OrderType
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})
interface newOrderType {
    data: {
        msg: string,
        orderId: string
    }
}
interface OrderProducts {
    productId: string,
    productQtd: number,
}

interface OrderData {
    data: OrderType[]
}

const apiEndPoints = {
    hightLightProducts: '/products/highlight',

    products: (page: number, limit: number) => `/products?page=${page}&limit=${limit}`,
    productsSearch: (query: string, page?: number, limit?: number) => `/products?q=${query}&page=${page}&limit=${limit}`,
    productInfo: (flavor: string, size: string, _id: string) => `/productInfo?flavor=${flavor}&size=${size}&_id=${_id},`,
    newProduct: () => `/newProduct`,
    updateProduct: (productId: string) => `/updateProduct/${productId}`,
    removeProduct: (productId: string) => `/productDelete/${productId}`,
    searchOrder: (query?: string, page?: number, limit?: number) => `/ordersSearch?q=${query}&page=${page}&limit=${limit}`,
    productBrand: (brand: string, page?: number, limit?: number) => `/productBrand?brand=${brand}&page=${page}&limit=${limit}`,

    getUser: () => '/user',
    newOrder: () => '/newOrder',
    getOrders: () => '/orders',
    updateOrder: () => '/updateOrder',
    orderInfo: (orderId: string) => `/orderInfo?orderId=${orderId}`,
    adminGetOrders: () => '/admin-orders',
    adminOrderInfo: (orderId: string) => `/admin-orderInfo?orderId=${orderId}`,


}

const axiosRequest = {
    highlightProducts: (): Promise<ProductsType> => axiosInstance.get(apiEndPoints.hightLightProducts),

    products: (page: number, limit: number): Promise<ProductsType> => axiosInstance.get(apiEndPoints.products(page, limit)),
    productBrand: (brand: string, page?: number, limit?: number): Promise<ProductsType> => axiosInstance.get(apiEndPoints.productBrand(brand, page, limit)),
    productsSearch: (query: string, page?: number, limit?: number): Promise<ProductsType> => axiosInstance.get(apiEndPoints.productsSearch(query, page, limit)),
    productInfo: (flavor: string, size: string, _id: string): Promise<ProductInfoType> => axiosInstance.get(apiEndPoints.productInfo(flavor, size, _id)),
    newProduct: (product: NewProductType) => axiosInstance.post(apiEndPoints.newProduct(), product),
    updateProduct: (productId: string, product: ProductType) => axiosInstance.put(apiEndPoints.updateProduct(productId), { product }),
    removeProduct: (productId: string): Promise<any> => axiosInstance.delete(apiEndPoints.removeProduct(productId)),


    getUser: (): Promise<DataUserType> => axiosInstance.get(apiEndPoints.getUser(), { withCredentials: true }),

    newOrder: (price: string, products: OrderProducts[], extra: { paymentMethod: string, change: string | boolean }): Promise<newOrderType> => axiosInstance.post(apiEndPoints.newOrder(), { price, products, extra }, { withCredentials: true }),
    getOrders: (): Promise<DataOrders> => axiosInstance.get(apiEndPoints.getOrders(), { withCredentials: true }),
    adminGetOrders: (): Promise<DataOrders> => axiosInstance.get(apiEndPoints.adminGetOrders(), { withCredentials: true }),
    updateOrder: (orderId: string, updatedOrder: UpdateOrderType): Promise<string> => axiosInstance.patch(apiEndPoints.updateOrder(), { orderId, updatedOrder }, { withCredentials: true }),
    orderInfo: (orderId: string): Promise<DataOrder> => axiosInstance.get(apiEndPoints.orderInfo(orderId), { withCredentials: true }),
    adminOrderInfo: (orderInfo: string): Promise<DataOrder> => axiosInstance.get(apiEndPoints.adminOrderInfo(orderInfo), { withCredentials: true }),
    searchOrder: (query?: string, page?: number, limit?: number): Promise<OrderData> => axiosInstance.get(apiEndPoints.searchOrder(query, page, limit))



}

export default axiosRequest