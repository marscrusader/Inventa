import { useState } from 'react'
import { CategoryDialogState } from '../interfaces/category'


const initState = {
  name: '',
  showDialog: false,
  loading: false
}

export const useCategoryDialogState = (): [
  CategoryDialogState,
  (state: CategoryDialogState) => void,
  (name: string) => void,
  () => void,
  () => void,
  () => void
] => {
  const [categoryDialogState, _setCategoryDialogState] = useState(initState)

  const setCategoryDialogState = (state: CategoryDialogState) => {
    _setCategoryDialogState(state)
  }

  const openCategoryDialog = () => {
    setCategoryDialogState({
      ...categoryDialogState,
      showDialog: true
    })
  }

  const onCategoryNameChange = (name: string) => {
    setCategoryDialogState({
      ...categoryDialogState,
      name
    })
  }

  const closeCategoryDialog = () => {
    setCategoryDialogState({
      ...categoryDialogState,
      showDialog: false
    })
  }

  const resetCategoryDialog = () => {
    setCategoryDialogState(initState)
  }

  return [categoryDialogState, setCategoryDialogState, onCategoryNameChange, openCategoryDialog, closeCategoryDialog, resetCategoryDialog]
}
