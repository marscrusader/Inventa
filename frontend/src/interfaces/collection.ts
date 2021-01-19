export interface ListCollectionResponse {
  id: string;
  name: string;
  s3Id: string;
  s3ThumbnailId: string;
}

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
