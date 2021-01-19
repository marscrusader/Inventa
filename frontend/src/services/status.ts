import { AxiosResponse } from "axios";
import { CreateStatusRequest, ListStatus } from "../interfaces/status";
import ApiClient from "../utils/api";

export const listStatus = async (token: string, collectionId: string): Promise<ListStatus[]> => {
  return (await ApiClient({
    method: 'GET',
    url: `/status/list/${collectionId}`,
    headers: {
      authorization: `Bearer ${token}`
    }
  })).data
}

export const createStatus = async (token: string, data: CreateStatusRequest): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'POST',
    url: `/status/create`,
    headers: {
      authorization: `Bearer ${token}`
    },
    data
  }))
}

export const deleteStatus = async (token: string, statusName: string): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'DELETE',
    url: `/status/delete/${statusName}`,
    headers: {
      authorization: `Bearer ${token}`
    }
  }))
}