import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import LoadingButton from '../common/LoadingButton'
import TextField from '@material-ui/core/TextField'
import { CreateCategoryDialog } from '../../interfaces/category'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles((_theme) => ({
  cancelButton: {
    backgroundColor: "#333",
    '&:hover': {
      background: "black",
    },
  }
}))

export default function CategoryDialog({
  categoryDialogState,
  onCategoryNameChange,
  onSubmitClick,
  onCancelClick,
  onCloseDialog
}: CreateCategoryDialog): JSX.Element {
  const classes = useStyles()
  const { showDialog, name, submitButtonDisabled, submitButtonLoading } = categoryDialogState
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">New Category</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="add-category"
            label="Name of category"
            fullWidth
            value={name}
            onChange={(e) => onCategoryNameChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton text="Cancel" onClick={onCancelClick} buttonStyle={classes.cancelButton}>
          </LoadingButton>
          <LoadingButton text="Create" onClick={onSubmitClick} loading={submitButtonLoading} disabled={submitButtonDisabled} color="primary">
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
