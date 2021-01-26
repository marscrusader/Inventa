import { AxiosResponse } from "axios";
import { CreateInventoryRequest, InventoryResponse, UpdateInventoryRequest } from "../interfaces/inventory";
import ApiClient from "../utils/api";

export const listInventories = async (token: string, collectionId: number): Promise<InventoryResponse[]> => {
  return (await ApiClient({
    method: 'GET',
    url: `/inventory/list/${collectionId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).data
}

export const findInventory = async (token: string, inventoryId: number): Promise<InventoryResponse> => {
  return (await ApiClient({
    method: 'GET',
    url: `/inventory/find/${inventoryId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).data
}

export const createInventory = async (token: string, data: CreateInventoryRequest): Promise<number> => {
  return (await ApiClient({
    method: 'POST',
    url: '/inventory/create',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data
  })).data.id
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

export const deleteInventory = async (token: string, inventoryId: number): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'DELETE',
    url: `/inventory/delete/${inventoryId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }))
}

export const uploadS3File = async (token: string, inventoryId: number, image: File): Promise<AxiosResponse> => {
  const bodyFormData = new FormData()
  bodyFormData.append('inventory', image)
  return (await ApiClient({
    method: 'POST',
    url: `/file/upload/${inventoryId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    data: bodyFormData
  }))
}

export const deleteFile = async (token: string, inventoryId: number): Promise<AxiosResponse> => {
  return (await ApiClient({
    method: 'DELETE',
    url: `/file/delete/${inventoryId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }))
}