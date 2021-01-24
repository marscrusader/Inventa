import { Model, BuildOptions } from "sequelize";

export interface CollectionAttributes {
  id?: number;
  name: string;
  userId: number;
  s3Id?: string;
  s3ThumbnailId?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CollectionModelInterface extends Model<CollectionAttributes>, CollectionAttributes { }

export type CollectionStatic = typeof Model & {
  new(values?: Record<string, unknown>, options?: BuildOptions): CollectionModelInterface;
};

export interface CreateCollectionRequest {
  name: string;
  userId: number;
  s3Id?: string;
  s3ThumbnailId?: string
}


export interface UpdateCollectionRequest {
  id: number;
  name: string;
  userId: number;
  s3Id?: string;
  s3ThumbnailId?: string
}
