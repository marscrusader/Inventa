export interface ListInventoryResponse {
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
