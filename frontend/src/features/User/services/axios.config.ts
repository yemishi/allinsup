import axios, { AxiosInstance } from "axios";
import { AddressType } from "../../../types";
import { UserType } from "../../../types";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        withCredentials: true
    }
})

type FetchAddressType = { localidade: string, uf: string; } | { error: true };
type UserData = { user: UserType, isAuthenticated: boolean }

const loginRequest = {

    login: async (tel: string): Promise<any> => {
        try {
            const response = await axiosInstance.post('/login', { tel });
            return Promise.resolve(response.data);
        } catch (error) {
            console.error("Ocorreu um erro ao fazer login");
        }
    },
    checkAuth: async (): Promise<UserData | { isAuthenticated: false }> => {
        try {
            const response = await axiosInstance.get('/check-auth');
            return Promise.resolve(response.data);
        } catch (error) {
            return { isAuthenticated: false }
        }
    },

    logout: async (): Promise<any> => {
        try {
            const response = await axiosInstance.get('/logout');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (): Promise<any> => {
        try {
            const response = await axiosInstance.delete('/delete-user')
            return Promise.resolve(response.data);
        } catch (error) {
            console.error("Ocorreu algum erro ao deletar sua conta");
        }
    },
    fetchAddressInfo: async (cep: string): Promise<FetchAddressType | { error: true }> => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_CEP_API_URL}/${cep}/json`)
            return Promise.resolve(response.data);
        } catch (error) {
            console.log(error)
            return { error: true }
        }
    },
    updateUser: async (address: AddressType): Promise<any> => {
        try {
            const response = await axiosInstance.patch('/update-user', { address })
            return Promise.resolve(response.data);
        } catch (error) {
            return "algo deu errado"
        }
    }

};



export default loginRequest