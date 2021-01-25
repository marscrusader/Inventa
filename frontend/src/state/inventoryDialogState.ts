import { useState } from "react"
import { InventoryDialogStateInterface, InventoryFormFieldIds } from "../interfaces/inventory"


export const useInventoryDialogState = (): [
  InventoryDialogStateInterface,
  (state: InventoryDialogStateInterface) => void,
  () => void,
  () => void,
  (key: InventoryFormFieldIds, value: string | number) => void
] => {
  const [inventoryDialogState, _setInventoryDialogState] = useState({
    dialogTitle: '',
    dialogDescription: '',
    inventoryName: '',
    inventoryId: 0,
    inventoryDescription: '',
    category: '',
    quantity: 1,
    status: '',
    cost: 0,
    salePrice: 0,
    serialNumber: '',
    submitButtonText: '',
    showDialog: false,
    submitButtonLoading: false,
    submitButtonDisabled: false
  })

  const setInventoryDialogState = (state: InventoryDialogStateInterface) => {
    _setInventoryDialogState(state)
  }

  const closeInventoryDialog = () => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      showDialog: false
    })
  }

  const openCreateInventoryDialog = () => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      dialogTitle: 'Create a new inventory',
      dialogDescription: 'Enter the required fields below and click on the "Create" button.',
      submitButtonText: 'Create',
      showDialog: true
    })
  }

  const onInventoryNameChange = (inventoryName: string) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      inventoryName
    })
  }

  const onInventoryDescriptionChange = (inventoryDescription: string) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      inventoryDescription
    })
  }

  const onInventoryCategoryChange = (category: string) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      category
    })
  }

  const onInventoryStatusChange = (status: string) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      status
    })
  }

  const onInventoryQuantityChange = (quantity: number) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      quantity
    })
  }

  const onInventoryCostChange = (cost: number) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      cost
    })
  }

  const onInventorySalePriceChange = (salePrice: number) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      salePrice
    })
  }

  const onInventorySerialNumberChange = (serialNumber: string) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      serialNumber
    })
  }

  const onInventoryFormChange = (key: InventoryFormFieldIds, value: string | number) => {
    // This way we don't have to pass a lot of callback functions as props to InventoryDialog
    switch (key) {
      case InventoryFormFieldIds.INVENTORY_NAME:
        onInventoryNameChange(value as string)
        break

      case InventoryFormFieldIds.INVENTORY_DESCRIPTION:
        onInventoryDescriptionChange(value as string)
        break

      case InventoryFormFieldIds.CATEGORY:
        onInventoryCategoryChange(value as string)
        break

      case InventoryFormFieldIds.STATUS:
        onInventoryStatusChange(value as string)
        break

      case InventoryFormFieldIds.COST:
        onInventoryCostChange(value as number)
        break

      case InventoryFormFieldIds.SALE_PRICE:
        onInventorySalePriceChange(value as number)
        break

      case InventoryFormFieldIds.QUANTITY:
        onInventoryQuantityChange(value as number)
        break

      case InventoryFormFieldIds.SERIAL_NUMBER:
        onInventorySerialNumberChange(value as string)
        break
    }
  }

  return [
    inventoryDialogState,
    setInventoryDialogState,
    openCreateInventoryDialog,
    closeInventoryDialog,
    onInventoryFormChange
  ]
}
