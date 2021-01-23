import React from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import LoadingButton from '../common/LoadingButton'
import { InventoryDialogInterface, InventoryFormFieldIds } from '../../interfaces/inventory'


const useStyles = makeStyles((theme) => ({
  cancelButton: {
    backgroundColor: "#333",
    '&:hover': {
      background: "black",
    },
  },
  name: {
    marginBottom: theme.spacing(2)
  },
  description: {
    marginBottom: theme.spacing(2)
  },
  quantity: {
    width: '25%'
  },
  serialNumber: {
    width: '70%'
  },
  category: {
    width: '47.5%'
  },
  status: {
    width: '47.5%'
  },
  cost: {
    width: '47.5%'
  },
  salePrice: {
    width: '47.5%'
  }
}))


export default function InventoryDialog({
  dialogTitle,
  inventoryName,
  dialogDescription,
  inventoryDescription,
  showDialog,
  category,
  status,
  quantity,
  cost,
  salePrice,
  serialNumber,
  onInventoryFormChange,
  cancelButtonText = "Cancel",
  submitButtonText = "Create",
  submitButtonLoading,
  submitButtonDisabled,
  onSubmitClick,
  onCancelClick,
}: InventoryDialogInterface): JSX.Element {
  const classes = useStyles()
  return (
    <div>
      <Dialog open={showDialog} onClose={onCancelClick} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogDescription}
          </DialogContentText>
          <TextField
            className={classes.name}
            required
            autoFocus
            margin="dense"
            id={InventoryFormFieldIds.INVENTORY_NAME}
            label="Name of inventory"
            fullWidth
            value={inventoryName}
            onChange={(e) => onInventoryFormChange(InventoryFormFieldIds.INVENTORY_NAME, e.target.value)}
          />
          <TextField
            margin="dense"
            className={classes.description}
            id={InventoryFormFieldIds.INVENTORY_DESCRIPTION}
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={inventoryDescription}
            onChange={(e) => onInventoryFormChange(InventoryFormFieldIds.INVENTORY_DESCRIPTION, e.target.value)}
          />
          <Box display="flex" justifyContent="space-between">
            <TextField
              className={classes.quantity}
              margin="dense"
              required
              autoFocus
              id={InventoryFormFieldIds.QUANTITY}
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => onInventoryFormChange(InventoryFormFieldIds.QUANTITY, e.target.value)}
            />
            <TextField
              className={classes.serialNumber}
              autoFocus
              margin="dense"
              id={InventoryFormFieldIds.SERIAL_NUMBER}
              label="Serial Number"
              value={serialNumber}
              onChange={(e) => onInventoryFormChange(InventoryFormFieldIds.SERIAL_NUMBER, e.target.value)}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField
              className={classes.category}
              select
              margin="dense"
              id={InventoryFormFieldIds.CATEGORY}
              label="Category"
              value={category}
              onChange={(e) => onInventoryFormChange(InventoryFormFieldIds.CATEGORY, e.target.value)}
            >
              {[]}
            </TextField>
            <TextField
              className={classes.status}
              select
              margin="dense"
              id={InventoryFormFieldIds.STATUS}
              label="Status"
              value={status}
              onChange={(e) => onInventoryFormChange(InventoryFormFieldIds.STATUS, e.target.value)}
            >
              {[]}
            </TextField>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField
              className={classes.cost}
              autoFocus
              margin="dense"
              id={InventoryFormFieldIds.COST}
              label="Cost"
              type="number"
              value={cost}
              onChange={(e) => onInventoryFormChange(InventoryFormFieldIds.COST, e.target.value)}
            />
            <TextField
              className={classes.salePrice}
              margin="dense"
              autoFocus
              id={InventoryFormFieldIds.SALE_PRICE}
              label="Sale Price"
              type="number"
              value={salePrice}
              onChange={(e) => onInventoryFormChange(InventoryFormFieldIds.SALE_PRICE, e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton text={cancelButtonText} onClick={onCancelClick} loading={false} disabled={false} buttonStyle={classes.cancelButton}>
          </LoadingButton>
          <LoadingButton text={submitButtonText} onClick={onSubmitClick} loading={submitButtonLoading} disabled={submitButtonDisabled} color="primary">
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
