import { useState } from 'react'
import { StatusDialogState } from '../interfaces/status'

const initState = {
  name: '',
  showDialog: false,
  loading: false
}
export const useStatusDialogState = (): [
  StatusDialogState,
  (state: StatusDialogState) => void,
  (name: string) => void,
  () => void,
  () => void,
  () => void
] => {
  const [statusDialogState, _setStatusDialogState] = useState(initState)

  const setStatusDialogState = (state: StatusDialogState) => {
    _setStatusDialogState(state)
  }

  const openStatusDialog = () => {
    setStatusDialogState({
      ...statusDialogState,
      showDialog: true
    })
  }

  const onStatusNameChange = (name: string) => {
    setStatusDialogState({
      ...statusDialogState,
      name
    })
  }

  const closeStatusDialog = () => {
    setStatusDialogState({
      ...statusDialogState,
      showDialog: false
    })
  }

  const resetStatusDialog = () => {
    setStatusDialogState(initState)
  }

  return [statusDialogState, setStatusDialogState, onStatusNameChange, openStatusDialog, closeStatusDialog, resetStatusDialog]
}
