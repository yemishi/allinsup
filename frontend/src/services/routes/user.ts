import { AxiosInstance } from "axios";
import { DefaultResponse, ErrorType, UserType } from "../../types/response";

type AddressType = {
  address: string;
  cep: string;
  state: string;
  city: string;
  houseNumber: number;
  complement: string;
};
const userRequest = (instance: AxiosInstance, baseUrl: string) => {
  return {
    info: (): Promise<Omit<UserType, "password"> | ErrorType> =>
      instance.get(`${baseUrl}/user`).then((res) => res.data),
    login: (
      email: string,
      password: string
    ): Promise<{ error: false; token: string; message: string } | ErrorType> =>
      instance
        .post(`${baseUrl}/user/login`, { email, password })
        .then((res) => res.data),

    create: (
      email: string,
      password: string,
      name: string
    ): Promise<DefaultResponse> =>
      instance
        .post(`${baseUrl}/user/create`, { email, password, name })
        .then((res) => res.data),
    delete: (): Promise<DefaultResponse> =>
      instance.delete(`${baseUrl}/user/delete`).then((res) => res.data),
    edit: (
      email?: string,
      password?: string,
      name?: string,
      address?: AddressType
    ): Promise<DefaultResponse> =>
      instance
        .patch(`${baseUrl}/user`, { email, password, name, address })
        .then((res) => res.data),
    upgrade: (): Promise<DefaultResponse> =>
      instance.patch(`${baseUrl}/user/upgrade`).then((res) => res.data),
  };
};

export default userRequest;
