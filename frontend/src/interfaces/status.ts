export interface ListStatus {
  name: string;
}

export interface CreateStatusRequest {
  name: string;
  collectionId: number;
}

export interface CreateStatusDialog {
  name: string;
  showDialog: boolean;
  submitButtonLoading?: boolean;
  submitButtonDisabled?: boolean;
  onStatusNameChange: (value: string) => void;
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>;
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
  onCloseDialog?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface StatusDialogState {
  name: string;
  loading: boolean;
  showDialog: boolean;
}
