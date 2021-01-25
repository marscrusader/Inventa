export type SnackbarTheme = "success" | "info" | "warning" | "error"

export interface SnackbarInterface {
  showSnackbar: boolean;
  message: string;
  theme?: SnackbarTheme;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

export interface SnackbarStateInterface {
  showSnackbar: boolean;
  message: string;
  theme: SnackbarTheme;
}
