import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { SnackbarInterface } from '../../interfaces/snackbar';

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />

export default function CustomSnackbar({ showSnackbar, message, theme = "success", onClose }: SnackbarInterface): JSX.Element {
  return (
    <Snackbar open={showSnackbar} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity={theme}>
        {message}
      </Alert>
    </Snackbar>
  )
}
