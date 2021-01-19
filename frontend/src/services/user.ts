import { CreateUserFormInterface } from "../interfaces/user";
import ApiClient from "../utils/api";

export const createUser = async (data: CreateUserFormInterface) => {
  console.log(data)
  return (await ApiClient.post('/user/create', data))
}
