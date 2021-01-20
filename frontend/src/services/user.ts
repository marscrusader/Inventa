import { AxiosResponse } from "axios";
import { CreateUserFormInterface, GetUserResponse } from "../interfaces/user";
import ApiClient from "../utils/api";

export const createUser = async (data: CreateUserFormInterface): Promise<AxiosResponse> => {
  return (await ApiClient.post('/user/create', data))
}

export const getUser = async (token: string, email: string): Promise<GetUserResponse> => {
  return (await ApiClient({
    method: 'GET',
    url: `/user/find/${email}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).data
}
