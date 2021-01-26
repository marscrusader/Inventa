import React from 'react'
import {
  makeStyles,
  Box,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Divider
} from '@material-ui/core'
import LoadingButton from '../common/LoadingButton'
import Dropzone from '../common/Dropzone'
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

enum categoryActions {
  ADD_CATEGORY = 'ADD_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY'
}

enum statusActions {
  ADD_STATUS = 'ADD_STATUS',
  DELETE_STATUS = 'DELETE_STATUS'
}

export default function InventoryDialog({
  inventoryDialogState,
  onInventoryFormChange,
  categoryList,
  statusList,
  cancelButtonText = "Cancel",
  onSubmitClick,
  onCancelClick,
  addNewCategory,
  addNewStatus,
  onFileUpload,
  clearFile
}: InventoryDialogInterface): JSX.Element {
  const classes = useStyles()

  const onCategoryChange = (value: string) => {
    if (value === categoryActions.ADD_CATEGORY) {
      addNewCategory()
      return
    }
    onInventoryFormChange(InventoryFormFieldIds.CATEGORY, value)
  }

  const onStatusChange = (value: string) => {
    if (value === statusActions.ADD_STATUS) {
      addNewStatus()
      return
    }
    onInventoryFormChange(InventoryFormFieldIds.STATUS, value)
  }

  const {
    showDialog,
    dialogDescription,
    dialogTitle,
    inventoryDescription,
    inventoryName,
    quantity,
    category,
    status,
    cost,
    s3Id,
    salePrice,
    serialNumber,
    submitButtonDisabled,
    submitButtonLoading,
    submitButtonText
  } = inventoryDialogState

  return (
    <div>
      <Dialog open={showDialog} onClose={onCancelClick} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          {
            !!dialogDescription && <DialogContentText>{dialogDescription}</DialogContentText>
          }
          <Dropzone previewUrl={s3Id} onFileUpload={onFileUpload} clearFile={clearFile} />
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
              <MenuItem value={categoryActions.ADD_CATEGORY}>Add New Category</MenuItem>
              <Divider />
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
              <MenuItem value={statusActions.ADD_STATUS}>Add New Status</MenuItem>
              <Divider />
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
              helperText="Up to 2 decimal places"
              value={cost}
              onChange={(e) => onInventoryFormChange(InventoryFormFieldIds.COST, e.target.value)}
            />
            <TextField
              className={classes.salePrice}
              margin="dense"
              autoFocus
              id={InventoryFormFieldIds.SALE_PRICE}
              label="Sale Price"
              helperText="Up to 2 decimal places"
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
