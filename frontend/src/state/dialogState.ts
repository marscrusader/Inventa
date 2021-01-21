import { useState } from 'react'
import { DialogStateInterface } from '../interfaces/dialog'


export const useDialogState = (): [
  DialogStateInterface,
  (state: DialogStateInterface) => void,
  () => void,
  () => void,
  () => void
] => {
  const [dialogState, _setDialogState] = useState({
    title: '',
    description: '',
    isError: false,
    showDialog: false,
    submitButtonText: ''
  })

  const setDialogState = (state: DialogStateInterface) => {
    _setDialogState(state)
  }

  const handleDialogSubmit = () => {
    if (dialogState.isError) {
      handleCloseDialog()
      return
    }
  }

  const handleCloseDialog = () => {
    _setDialogState({
      ...dialogState,
      showDialog: false
    })
  }

  const setCommonDialogError = () => {
    _setDialogState({
      title: 'Unexpected Error',
      description: 'An unexpected error has occured, please contact a developer or an administrator. We apologize for the inconvenience caused.',
      isError: true,
      showDialog: true,
      submitButtonText: 'Close'
    })
  }

  return [dialogState, setDialogState, setCommonDialogError, handleDialogSubmit, handleCloseDialog]
}
