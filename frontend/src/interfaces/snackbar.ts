export interface SnackbarInterface {
  showSnackbar: boolean;
  message: string;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

export interface SnackbarStateInterface {
  showSnackbar: boolean;
  message: string;
}
