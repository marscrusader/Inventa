import { useState } from "react"
import { CollectionDialogStateInterface } from "../interfaces/collection"

export const useCollectionDialogState = (): [
  CollectionDialogStateInterface,
  (state: CollectionDialogStateInterface) => void,
  () => void,
  () => void,
  (value: string) => void,
] => {
  const [collectionDialogState, _setCollectionDialogState] = useState({
    title: '',
    collectionName: '',
    description: '',
    submitButtonText: '',
    showDialog: false,
    submitButtonLoading: false,
    submitButtonDisabled: false,
  })

  const setCollectionDialogState = (state: CollectionDialogStateInterface) => {
    _setCollectionDialogState(state)
  }

  const closeCollectionDialog = () => {
    _setCollectionDialogState({
      ...collectionDialogState,
      showDialog: false
    })
  }

  const openCreateCollectionDialog = () => {
    _setCollectionDialogState({
      ...collectionDialogState,
      collectionName: '',
      title: 'Create a new collection',
      description: 'Enter the name of the collection and click on the "Create" button.',
      submitButtonText: 'Create',
      showDialog: true
    })
  }

  const onCollectionNameChange = (collectionName: string) => {
    _setCollectionDialogState({
      ...collectionDialogState,
      collectionName
    })
  }

  return [
    collectionDialogState,
    setCollectionDialogState,
    openCreateCollectionDialog,
    closeCollectionDialog,
    onCollectionNameChange
  ]
}
