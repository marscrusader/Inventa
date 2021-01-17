import { Model, BuildOptions } from "sequelize";

export interface InventoryCategoryAttributes {
  id?: number;
  name: string;
  collectionId: number;
}

export interface InventoryCategoryModelInterface extends Model<InventoryCategoryAttributes>, InventoryCategoryAttributes { }

export type InventoryCategoryStatic = typeof Model & {
  new(values?: Record<string, unknown>, options?: BuildOptions): InventoryCategoryModelInterface;
};

export interface CreateCategoryRequest {
  name: string;
  collectionId: number;
}
