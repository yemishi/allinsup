import { AxiosInstance } from "axios";
import { DefaultResponse, ErrorType, OrderType } from "../../types/response";

type OrderUpdate = {
  updated: {
    _id: string;
    size: string;
    flavor: string;
    removed?: "size" | "variant" | "product";
    updatedStock?: number;
    updatedPrice?: number;
  }[];
  message: string;
  error: true;
  isUpdate: true;
};

type CreateOrderResponse =
  | OrderUpdate
  | { error: true; message: string; isUpdate: false }
  | { error: false; message: string; isUpdate: false };

type ProductsOrder = {
  productId: string;
  name: string;
  flavor: string;
  size: string;
  coverPhoto: string;
  price: number;
  qtd: number;
};

const orderRequest = (instance: AxiosInstance, baseUrl: string) => {
  return {
    single: (orderId: string): Promise<OrderType | ErrorType> =>
      instance
        .get(`${baseUrl}/order?orderId=${orderId}`)
        .then((res) => res.data),
    many: (
      page?: number,
      limit?: number
    ): Promise<
      { orders: OrderType[]; hasMore: boolean; error: false } | ErrorType
    > =>
      instance
        .get(`${baseUrl}/order?page=${page}&limit=${limit}`)
        .then((res) => res.data),
    getAll: (
      page?: number,
      limit?: number
    ): Promise<
      { orders: OrderType[]; hasMore: boolean; error: false } | ErrorType
    > =>
      instance
        .get(`${baseUrl}/order/admin?page=${page}&limit=${limit}`)
        .then((res) => res.data),
    create: (
      products: ProductsOrder[],
      totalPaid: number,
      method: string
    ): Promise<CreateOrderResponse> =>
      instance
        .post(`${baseUrl}/order`, { products, totalPaid, method })
        .then((res) => res.data),
    edit: (status: string, orderId: string): Promise<DefaultResponse> =>
      instance
        .patch(`${baseUrl}/order`, { status, orderId })
        .then((res) => res.data),
  };
};

export default orderRequest;
