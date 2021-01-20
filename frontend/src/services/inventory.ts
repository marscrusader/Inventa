import { AxiosResponse } from "axios";
import { CreateInventoryRequest, InventoryResponse, ListInventoryResponse, UpdateInventoryRequest } from "../interfaces/inventory";
import ApiClient from "../utils/api";

export const listInventory = async (token: string, collectionId: string): Promise<ListInventoryResponse[]> => {
  return (await ApiClient({
    method: 'GET',
    url: `/inventory/list/${collectionId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).data
}

export const findInventory = async (token: string, inventoryId: string): Promise<InventoryResponse> => {
  return (await ApiClient({
    method: 'GET',
    url: `/inventory/find/${inventoryId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).data
}

export const createInventory = async (token: string, data: CreateInventoryRequest): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'POST',
    url: '/inventory/create',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data
  }))
}

export const updateInventory = async (token: string, data: UpdateInventoryRequest): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'PUT',
    url: '/inventory/update',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data
  }))
}

export const deleteInventory = async (token: string, inventoryId: string): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'DELETE',
    url: `/inventory/delete/${inventoryId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }))
}
