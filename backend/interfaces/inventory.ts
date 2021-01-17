import { Model, BuildOptions } from "sequelize";

export interface InventoryAttributes {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  collectionId: string;
  s3Id?: string;
  s3ThumbnailId?: string;
  serialNumber?: string;
  status?: string;
  cost?: string;
  salePrice?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InventoryModelInterface extends Model<InventoryAttributes>, InventoryAttributes { }

export type InventoryStatic = typeof Model & {
  new(values?: Record<string, unknown>, options?: BuildOptions): InventoryModelInterface;
};
