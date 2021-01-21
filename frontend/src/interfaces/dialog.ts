export interface SimpleDialogInterface {
  title: string;
  description: string;
  showDialog: boolean;
  submitButtonText: string;
  submitButtonLoading?: boolean;
  submitButtonDisabled?: boolean;
  cancelButtonLoading?: boolean;
  cancelButtonDisabled?: boolean;
  cancelButtonText?: string;
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>;
  onCancelClick?: React.MouseEventHandler<HTMLButtonElement>;
  onCloseDialog?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface SnackbarInterface {
  showSnackbar: boolean;
  message: string;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}
