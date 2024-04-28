import { AxiosInstance } from "axios";
import { ErrorType, SellType } from "../../types/response";

const sellRequest = (instance: AxiosInstance, baseUrl: string) => {
  return {
    single: (sellId: string): Promise<SellType | ErrorType> =>
      instance.get(`${baseUrl}/sell?sellId=${sellId}`).then((res) => res.data),
    many: (
      page?: number,
      limit?: number,
      productId?: string,
      userId?: string
    ): Promise<
      { sells: SellType[]; error: false; hasMore: boolean } | ErrorType
    > =>
      instance
        .get(
          `${baseUrl}/sell?page=${page}&limit=${limit}&productId=${productId}&userId=${userId}`
        )
        .then((res) => res.data),
  };
};

export default sellRequest;
