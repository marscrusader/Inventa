import { Model, BuildOptions } from "sequelize";

export interface CollectionAttributes {
  id?: number;
  name: string;
  userId: number;
  s3Id?: string;
  s3ThumbnailId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CollectionModelInterface extends Model<CollectionAttributes>, CollectionAttributes { }

export type CollectionStatic = typeof Model & {
  new(values?: Record<string, unknown>, options?: BuildOptions): CollectionModelInterface;
};
