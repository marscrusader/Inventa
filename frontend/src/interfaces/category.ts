export interface ListCategory {
  name: string;
}

export interface CreateCategoryRequest {
  name: string;
  collectionId: number;
}

export interface CreateCategoryDialog {
  categoryDialogState: CategoryDialogState;
  onCategoryNameChange: (value: string) => void;
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>;
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
  onCloseDialog?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CategoryDialogState {
  name: string;
  loading: boolean;
  showDialog: boolean;
  submitButtonLoading?: boolean;
  submitButtonDisabled?: boolean;
}
