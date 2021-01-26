import { useState } from "react"
import { InventoryDialogStateInterface, InventoryFormFieldIds } from "../interfaces/inventory"


const initState: InventoryDialogStateInterface = {
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
  submitButtonDisabled: false,
  s3Id: undefined,
  image: undefined
}

export const useInventoryDialogState = (): [
  InventoryDialogStateInterface,
  (state: InventoryDialogStateInterface) => void,
  () => void,
  () => void,
  (key: InventoryFormFieldIds, value: string | number) => void,
  (image: File) => void,
] => {
  const [inventoryDialogState, _setInventoryDialogState] = useState(initState)

  const setInventoryDialogState = (state: InventoryDialogStateInterface) => {
    _setInventoryDialogState(state)
  }

  const closeInventoryDialog = () => {
    _setInventoryDialogState(initState)
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

  const onInventoryCostChange = (cost: number | string) => {
    console.log(cost)
    console.log(typeof cost)
    _setInventoryDialogState({
      ...inventoryDialogState,
      cost: parseFloat((typeof cost === 'string' ? parseFloat(cost) : cost).toFixed(2))
    })
  }

  const onInventorySalePriceChange = (salePrice: number) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      salePrice: parseFloat((typeof salePrice === 'string' ? parseFloat(salePrice) : salePrice).toFixed(2))
    })
  }

  const onInventorySerialNumberChange = (serialNumber: string) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      serialNumber
    })
  }

  const onInventoryImageChange = (image: File) => {
    _setInventoryDialogState({
      ...inventoryDialogState,
      image
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
    onInventoryFormChange,
    onInventoryImageChange
  ]
}
