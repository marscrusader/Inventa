export interface InventoryResponse {
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

export interface InventoryComponentProps {
  inventoriesState: InventoryResponse[];
  openCreateInventoryDialog: () => void;
}

export interface InventoryDialogInterface {
  dialogTitle: string;
  dialogDescription?: string;
  inventoryName: string;
  inventoryDescription?: string;
  category?: string;
  quantity: number;
  s3Id?: string;
  serialNumber?: string;
  status?: string;
  cost?: number;
  salePrice?: number;
  showDialog: boolean;
  submitButtonText?: string;
  submitButtonLoading: boolean;
  submitButtonDisabled: boolean;
  cancelButtonText?: string;
  onInventoryFormChange: (key: InventoryFormFieldIds, value: string | number) => void;
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>;
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface InventoryDialogStateInterface {
  dialogTitle: string;
  dialogDescription: string;
  inventoryName: string;
  inventoryDescription: string;
  category: string;
  quantity: number;
  status: string;
  cost: number;
  salePrice: number;
  serialNumber: string;
  submitButtonText: string;
  showDialog: boolean;
  submitButtonLoading: boolean;
  submitButtonDisabled: boolean;
}

export enum InventoryFormFieldIds {
  INVENTORY_NAME = 'inventoryName',
  INVENTORY_DESCRIPTION = 'inventoryDescription',
  CATEGORY = 'category',
  QUANTITY = 'quantity',
  STATUS = 'status',
  COST = 'cost',
  SALE_PRICE = 'salePrice',
  SERIAL_NUMBER = 'serialNumber'
}
