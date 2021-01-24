import React from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
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
    width: '45%'
  },
  status: {
    width: '45%'
  },
  cost: {
    width: '47.5%'
  },
  salePrice: {
    width: '47.5%'
  }
}))

const addCategory = "ADD_CATEGORY"
const addStatus = "ADD_STATUS"

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
  categoryList,
  statusList,
  cancelButtonText = "Cancel",
  submitButtonText = "Create",
  submitButtonLoading,
  submitButtonDisabled,
  onSubmitClick,
  onCancelClick,
  addNewCategory,
  addNewStatus
}: InventoryDialogInterface): JSX.Element {
  const classes = useStyles()

  const onCategoryChange = (value: string) => {
    if (value === addCategory) {
      addNewCategory()
      return
    }
    onInventoryFormChange(InventoryFormFieldIds.CATEGORY, value)
  }

  const onStatusChange = (value: string) => {
    if (value === addStatus) {
      addNewStatus()
      return
    }
    onInventoryFormChange(InventoryFormFieldIds.STATUS, value)
  }

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
              select
              className={classes.category}
              margin="dense"
              id={InventoryFormFieldIds.CATEGORY}
              label="Category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value as string)}
            >
              <MenuItem value={addCategory}>Add New Category</MenuItem>
              {
                categoryList.map(category => {
                  return (
                    <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                  )
                })
              }
            </TextField>
            <TextField
              select
              className={classes.status}
              margin="dense"
              id={InventoryFormFieldIds.STATUS}
              label="Status"
              value={status}
              onChange={(e) => onStatusChange(e.target.value as string)}
            >
              <MenuItem value={addStatus}>Add New Status</MenuItem>
              {
                statusList.map(status => {
                  return (
                    <MenuItem key={status.name} value={status.name}>{status.name}</MenuItem>
                  )
                })
              }
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
