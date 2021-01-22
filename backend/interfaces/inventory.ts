import { Model, BuildOptions } from "sequelize";

export interface InventoryAttributes {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  quantity: number;
  collectionId: number;
  s3Id?: string;
  s3ThumbnailId?: string;
  serialNumber?: string;
  status?: string;
  cost?: number;
  salePrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InventoryModelInterface extends Model<InventoryAttributes>, InventoryAttributes { }

export type InventoryStatic = typeof Model & {
  new(values?: Record<string, unknown>, options?: BuildOptions): InventoryModelInterface;
};

export interface CreateInventoryRequest {
  name: string;
  description?: string;
  category?: string;
  collectionId: number;
  quantity: number;
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
  quantity: number;
  s3Id: string;
  s3ThumbnailId: string;
  serialNumber: string;
  status: string;
  cost: number;
  salePrice: number;
}
