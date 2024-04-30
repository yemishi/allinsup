import { AxiosInstance } from "axios";
import { DefaultResponse, ErrorType, ProductType } from "../../types/response";

const productRequest = (instance: AxiosInstance, baseUrl: string) => {
  return {
    single: (productId: string): Promise<ProductType | ErrorType> =>
      instance
        .get(`${baseUrl}/product?productId=${productId}`)
        .then((res) => res.data),

    many: (
      page?: number,
      limit?: number,
      query?: string,
      brand?: string,
      category?: string
    ): Promise<
      { products: ProductType[]; hasMore: boolean; error: false } | ErrorType
    > =>
      instance
        .get(
          `${baseUrl}/product?page=${page || 0}&limit=${limit || 10}&query=${
            query || ""
          }&category=${category || ""}&brand=${brand || ""}`
        )
        .then((res) => res.data),

    create: (product: ProductType): Promise<DefaultResponse> =>
      instance.post(`${baseUrl}/product`, product).then((res) => res.data),

    edit: (
      product: Omit<ProductType, "error" | "_id">,
      productId: string,
      photosDelete?: string[]
    ): Promise<DefaultResponse> =>
      instance
        .patch(`${baseUrl}/product`, { product, productId, photosDelete })
        .then((res) => res.data),

    delete: (productId: string): Promise<DefaultResponse> =>
      instance
        .delete(`${baseUrl}/product?productId=${productId}`)
        .then((res) => res.data),
    highlight: (
      page?: number,
      limit?: number
    ): Promise<
      { products: ProductType[]; hasMore: boolean; error: false } | ErrorType
    > =>
      instance
        .get(
          `${baseUrl}/product/highlight?page=${page || 0}&limit=${limit || 10}`
        )
        .then((res) => res.data),
  };
};

export default productRequest;
