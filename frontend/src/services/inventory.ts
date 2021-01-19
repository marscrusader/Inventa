import { AxiosResponse } from "axios";
import { CreateInventoryRequest, ListInventoryResponse, UpdateInventoryRequest } from "../interfaces/inventory";
import ApiClient from "../utils/api";

export const listInventory = async (token: string, collectionId: string): Promise<ListInventoryResponse[]> => {
  return (await ApiClient({
    method: 'GET',
    url: `/inventory/list/${collectionId}`,
    headers: {
      authorization: `Bearer ${token}`
    }
  })).data
}

export const findInventory = async (token: string, inventoryId: string): Promise<ListInventoryResponse> => {
  return (await ApiClient({
    method: 'GET',
    url: `/inventory/find/${inventoryId}`,
    headers: {
      authorization: `Bearer ${token}`
    }
  })).data
}

export const createInventory = async (token: string, data: CreateInventoryRequest): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'POST',
    url: '/inventory/create',
    headers: {
      authorization: `Bearer ${token}`
    },
    data
  }))
}

export const updateInventory = async (token: string, data: UpdateInventoryRequest): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'PUT',
    url: '/inventory/update',
    headers: {
      authorization: `Bearer ${token}`
    },
    data
  }))
}

export const deleteInventory = async (token: string, inventoryId: string): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'DELETE',
    url: `/inventory/delete/${inventoryId}`,
    headers: {
      authorization: `Bearer ${token}`
    }
  }))
}
