import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { SimpleDialogInterface } from '../../interfaces/dialog'
import LoadingButton from './LoadingButton'

export default function SimpleDialog({
  title = 'Dialog title',
  description = 'This is a simple dialog',
  showDialog = false,
  submitButtonText = 'Submit',
  submitButtonLoading = false,
  submitButtonDisabled = false,
  cancelButtonLoading = false,
  cancelButtonDisabled = false,
  cancelButtonText = 'Cancel',
  onSubmitClick,
  onCancelClick,
  onCloseDialog
}: SimpleDialogInterface): JSX.Element {
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            cancelButtonText && onCancelClick
            &&
            <LoadingButton text={cancelButtonText} onClick={onCancelClick} loading={cancelButtonLoading} disabled={cancelButtonDisabled} color="primary">
            </LoadingButton>
          }
          <LoadingButton text={submitButtonText} onClick={onSubmitClick} loading={submitButtonLoading} disabled={submitButtonDisabled} color="primary">
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
