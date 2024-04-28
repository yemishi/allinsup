import { AxiosInstance } from "axios";
import { DefaultResponse, ErrorType } from "../../types/response";

const uploadImgRequest = (instance: AxiosInstance, baseUrl: string) => {
  return {
    single: (
      form: FormData
    ): Promise<{ url: string; error: false } | ErrorType> => {
      return instance
        .post(`${baseUrl}/uploadImage`, form)
        .then((res) => res.data);
    },
    many: (
      form: FormData
    ): Promise<{ urls: string[]; error: false } | ErrorType> =>
      instance
        .post(`${baseUrl}/uploadImage/many`, form)
        .then((res) => res.data),
    delete: (url: string): Promise<DefaultResponse> =>
      instance.delete(`${baseUrl}/uploadImage`, { data: url }),
    deleteMany: (urls: string[]): Promise<DefaultResponse> =>
      instance.delete(`${baseUrl}/uploadImage/many`, { data: urls }),
  };
};

export default uploadImgRequest;
