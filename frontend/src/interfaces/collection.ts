export interface ListCollectionResponse {
  id: number;
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

export interface CollectionDialogInterface {
  collectionDialogState: CollectionDialogStateInterface;
  onCollectionNameChange: (value: string) => void;
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>;
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CollectionDialogStateInterface {
  title: string;
  collectionName: string;
  description: string;
  submitButtonText: string;
  showDialog: boolean;
  submitButtonLoading: boolean;
  submitButtonDisabled: boolean;
}

export interface CollectionStateInterface extends ListCollectionResponse {
  selected: boolean;
}
