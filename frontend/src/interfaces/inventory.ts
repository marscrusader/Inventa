import { ListCategory } from "./category";
import { ListStatus } from "./status";

export interface InventoryResponse {
  id: number;
  name: string;
  description: string;
  cost: number;
  salePrice: number;
  quantity: number;
  s3Id?: string;
  created_at: Date;
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
  quantity: number;
  s3Id?: string;
  s3ThumbnailId?: string;
  serialNumber: string;
  status: string;
  cost: number;
  salePrice: number;
}

export interface InventoryComponentProps {
  inventoriesState: InventoryResponse[];
  deleteInventories: (ids: number[]) => void;
  openCreateInventoryDialog: () => void;
  openUpdateInventoryDialog: (state: InventoryDialogStateInterface) => void;
}

export interface InventoryDialogInterface {
  inventoryDialogState: InventoryDialogStateInterface;
  cancelButtonText?: string;
  categoryList: ListCategory[];
  statusList: ListStatus[];
  onInventoryFormChange: (key: InventoryFormFieldIds, value: string | number) => void;
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>;
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
  addNewCategory: () => void;
  addNewStatus: () => void;
  onFileUpload: (file: File) => void;
  clearFile: () => void;
}

export interface InventoryDialogStateInterface {
  dialogTitle: string;
  dialogDescription: string;
  inventoryId: number;
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
  image?: File;
  s3Id?: string;
}

export enum InventoryFormFieldIds {
  INVENTORY_NAME = 'inventoryName',
  INVENTORY_DESCRIPTION = 'inventoryDescription',
  CATEGORY = 'category',
  QUANTITY = 'quantity',
  STATUS = 'status',
  COST = 'cost',
  SALE_PRICE = 'salePrice',
  SERIAL_NUMBER = 'serialNumber',
  IMAGE = 'image'
}
