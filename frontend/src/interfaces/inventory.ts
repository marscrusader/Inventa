export interface ListInventoryResponse {
  id: string;
  name: string;
  description: string;
  cost: number;
  salePrice: number;
  quantity: number;
  s3Id: string;
  createdAt: Date;
  category: string;
  s3ThumbnailId: string;
  serialNumber: string;
  status: string;
}

export interface InventoryResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  s3ThumbnailId: string;
  serialNumber: string;
  status: string;
  cost: number;
  salePrice: number;
  s3Id: string
}

export interface CreateInventoryRequest {
  name: string;
  description?: string;
  category?: string;
  collectionId: number;
  s3Id?: string;
  s3ThumbnailId?: string;
  serialNumber?: string;
  status?: string;
  cost?: number;
  salePrice?: number;
}

export interface UpdateInventoryRequest {
  id: number;
  name: string;
  description: string;
  category: string;
  collectionId: number;
  s3Id: string;
  s3ThumbnailId: string;
  serialNumber: string;
  status: string;
  cost: number;
  salePrice: number;
}
