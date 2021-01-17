import { Model, BuildOptions } from "sequelize";

export interface InventoryStatusAttributes {
  id?: number;
  name: string;
  collectionId: number;
}

export interface InventoryStatusModelInterface extends Model<InventoryStatusAttributes>, InventoryStatusAttributes { }

export type InventoryStatusStatic = typeof Model & {
  new(values?: Record<string, unknown>, options?: BuildOptions): InventoryStatusModelInterface;
};
