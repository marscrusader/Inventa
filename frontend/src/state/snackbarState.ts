import { useState } from "react"
import { SnackbarStateInterface, SnackbarTheme } from "../interfaces/snackbar"


const snackbarInitState = {
  showSnackbar: false,
  message: '',
  theme: 'success' as SnackbarTheme
}

export const useSnackbarState = (): [
  SnackbarStateInterface,
  (state: SnackbarStateInterface) => void,
  () => void
] => {
  const [snackbarState, _setSnackbarState] = useState(snackbarInitState)

  const setSnackbarState = (state: SnackbarStateInterface) => {
    _setSnackbarState(state)
  }

  const closeSnackbar = () => {
    _setSnackbarState(snackbarInitState)
  }

  return [snackbarState, setSnackbarState, closeSnackbar]
}
