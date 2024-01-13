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
    data: { orders: OrderType[], totalOrders: number }
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
    productCategory: (category: string, page?: number, limit?: number) => `/productCategory?category=${category}&page=${page}&limit=${limit}`,

    getUser: () => '/user',
    newOrder: () => '/newOrder',
    getOrders: (page: number) => `/orders?page=${page}`,
    updateOrder: () => '/updateOrder',
    orderInfo: (orderId: string) => `/orderInfo?orderId=${orderId}`,
    adminGetOrders: () => '/admin-orders',
    adminOrderInfo: (orderId: string) => `/admin-orderInfo?orderId=${orderId}`,

}

const tel = localStorage.getItem('tel')

const axiosRequest = {
    highlightProducts: (): Promise<ProductsType> => axiosInstance.get(apiEndPoints.hightLightProducts),

    products: (page: number, limit: number): Promise<ProductsType> => axiosInstance.get(apiEndPoints.products(page, limit)),
    productBrand: (brand: string, page?: number, limit?: number): Promise<ProductsType> => axiosInstance.get(apiEndPoints.productBrand(brand, page, limit)),
    productCategory: (category: string, page?: number, limit?: number): Promise<ProductsType> => axiosInstance.get(apiEndPoints.productCategory(category, page, limit)),
    productsSearch: (query: string, page?: number, limit?: number): Promise<ProductsType> => axiosInstance.get(apiEndPoints.productsSearch(query, page, limit)),
    productInfo: (flavor: string, size: string, _id: string): Promise<ProductInfoType> => axiosInstance.get(apiEndPoints.productInfo(flavor, size, _id)),
    newProduct: (product: NewProductType) => axiosInstance.post(apiEndPoints.newProduct(), product),
    updateProduct: (productId: string, product: ProductType) => axiosInstance.put(apiEndPoints.updateProduct(productId), { product }),
    removeProduct: (productId: string): Promise<any> => axiosInstance.delete(apiEndPoints.removeProduct(productId)),


    getUser: (tel: string = ""): Promise<DataUserType> => axiosInstance.post(apiEndPoints.getUser(), { tel }),

    newOrder: (price: string, products: OrderProducts[], extra: { paymentMethod: string, change: string | boolean }, tel: string): Promise<newOrderType> => axiosInstance.post(apiEndPoints.newOrder(), { price, products, extra, tel }),
    getOrders: (tel: string, page: number): Promise<DataOrders> => axiosInstance.post(apiEndPoints.getOrders(page), { tel }),
    adminGetOrders: (): Promise<DataOrders> => axiosInstance.get(apiEndPoints.adminGetOrders()),
    updateOrder: (orderId: string, updatedOrder: UpdateOrderType): Promise<string> => axiosInstance.patch(apiEndPoints.updateOrder(), { orderId, updatedOrder }),
    orderInfo: (orderId: string): Promise<DataOrder> => axiosInstance.post(apiEndPoints.orderInfo(orderId), { tel }),
    adminOrderInfo: (orderInfo: string): Promise<DataOrder> => axiosInstance.get(apiEndPoints.adminOrderInfo(orderInfo)),
    searchOrder: (query?: string, page?: number, limit?: number): Promise<OrderData> => axiosInstance.get(apiEndPoints.searchOrder(query, page, limit))



}

export default axiosRequest