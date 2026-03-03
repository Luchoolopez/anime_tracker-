import apiClient from "./apiClient";
import type { LoginUserDTO, RegisterUserDTO } from "../types/user.type";

export const UserService = {
    login: async(data:LoginUserDTO) => {
        const response = await apiClient.post('/user/login', data);
        return response.data.data;
    },
    register: async(data:RegisterUserDTO) => {
        const response = await apiClient.post('/user/register', data);
        return response.data.data;
    }
}