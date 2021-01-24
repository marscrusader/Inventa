export interface ListStatus {
  name: string;
}

export interface CreateStatusRequest {
  name: string;
  collectionId: number;
}

export interface CreateStatusDialog {
  statusDialogState: StatusDialogState;
  onStatusNameChange: (value: string) => void;
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>;
  onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
  onCloseDialog?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface StatusDialogState {
  name: string;
  loading: boolean;
  showDialog: boolean;
  submitButtonLoading?: boolean;
  submitButtonDisabled?: boolean;
}
