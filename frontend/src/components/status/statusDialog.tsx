import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import LoadingButton from '../common/LoadingButton'
import TextField from '@material-ui/core/TextField'
import { CreateStatusDialog } from '../../interfaces/status'


export default function StatusDialog({
  name = '',
  showDialog = false,
  submitButtonLoading = false,
  submitButtonDisabled = false,
  onStatusNameChange,
  onSubmitClick,
  onCancelClick,
  onCloseDialog
}: CreateStatusDialog): JSX.Element {
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create A New Status</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="add-status"
            label="Name of status"
            fullWidth
            value={name}
            onChange={(e) => onStatusNameChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton text="Cancel" onClick={onCancelClick} color="primary">
          </LoadingButton>
          <LoadingButton text="Create" onClick={onSubmitClick} loading={submitButtonLoading} disabled={submitButtonDisabled} color="primary">
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
