
import React, { useEffect, useState } from 'react'
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  LinearProgress,
  Button
} from '@material-ui/core'
import Inventories from './inventory/Inventory'
import { Redirect } from 'react-router-dom'
import { Routes } from '../interfaces/router'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import Logger from 'loglevel'
import { getUser } from '../services/user'
import SimpleDialog from './common/SimpleDialog'
import { createCollection, listCollections } from '../services/collection'
import { CollectionStateInterface, ListCollectionResponse } from '../interfaces/collection'
import CollectionDialog from './collection/CollectionDialog'
import Snackbar from './common/Snackbar'
import { useDashboardStyles } from '../styles/dashboard'
import EmptyImage from '../static/empty.jpg'
import { useDialogState } from '../state/dialogState'
import { useSnackbarState } from '../state/snackbarState'
import { useCollectionDialogState } from '../state/collectionDialogState'
import { useUserState } from '../state/user'
import AppBar from './AppBar'
import Drawer from './Drawer'
import { createInventory, deleteInventory, listInventories, updateInventory, uploadS3File, deleteFile } from '../services/inventory'
import { InventoryResponse } from '../interfaces/inventory'
import InventoryDialog from './inventory/InventoryDialog'
import { useInventoryDialogState } from '../state/inventoryDialogState'
import { createCategory, listCategories } from '../services/category'
import { ListCategory } from '../interfaces/category'
import { ListStatus } from '../interfaces/status'
import { createStatus, listStatus } from '../services/status'
import CategoryDialog from './category/categoryDialog'
import StatusDialog from './status/statusDialog'
import { useCategoryDialogState } from '../state/categoryDialogState'
import { useStatusDialogState } from '../state/statusDialogState'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      DEMO VERSION&nbsp;
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Dashboard(): JSX.Element {
  const classes = useDashboardStyles()

  // User state
  const [
    isAuthenticated,
    isLoading,
    user,
    logout,
    getAccessToken,
    userState,
    setUserState
  ] = useUserState()

  // Drawer state
  const [open, setOpen] = useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  // Dialog state
  const [dialogState, setDialogState, setDialogError, handleDialogSubmit, handleCloseDialog] = useDialogState()

  // Snackbar state
  const [snackbarState, setSnackbarState, closeSnackbar] = useSnackbarState()

  // START - Collections state
  const [collectionsState, setCollectionsState] = useState([] as CollectionStateInterface[])
  const [
    collectionDialogState,
    setCollectionDialogState,
    openCreateCollectionDialog,
    closeCollectionDialog,
    onCollectionNameChange
  ] = useCollectionDialogState()

  // Collection actions
  const getCollections = async (token: string, userId: number): Promise<ListCollectionResponse[] | undefined> => {
    try {
      const collections = await listCollections(token, userId)
      setCollectionsState(collections.map((collection, index) => ({
        ...collection,
        // Select first collection by default
        selected: index === 0 ? true : false
      })))
      return collections
    } catch (collectionError) {
      Logger.error('[LIST_COLLECTION] Failed to get collections', collectionError)
      setDialogError()
      return
    } finally {
      setPageLoadingState(false)
    }
  }
  const addNewCollection = async () => {
    setCollectionDialogState({
      ...collectionDialogState,
      submitButtonLoading: true,
      submitButtonDisabled: true
    })
    // 1) Get the access token
    const token = await getAccessToken()
    // 2) Create collection
    try {
      await createCollection(token, {
        name: collectionDialogState.collectionName,
        userId: userState.id
      })
      getCollections(token, userState.id)
      setSnackbarState({
        showSnackbar: true,
        message: 'Collection created.',
        theme: 'success'
      })
    } catch (addCollectionError) {
      Logger.error('[ADD_COLLECTION] Failed to add new collection', addCollectionError)
      setDialogError()
    } finally {
      setCollectionDialogState({
        ...collectionDialogState,
        showDialog: false,
        submitButtonLoading: false,
        submitButtonDisabled: false
      })
    }
  }
  const getSelectedCollectionId = () => collectionsState.find(collection => collection.selected)?.id
  // END - Collections state

  // START - Inventories state
  const [inventoriesState, setInventoriesState] = useState([] as InventoryResponse[])
  const [
    inventoryDialogState,
    setInventoryDialogState,
    openCreateInventoryDialog,
    closeInventoryDialog,
    onInventoryFormChange
  ] = useInventoryDialogState()
  const getInventories = async (collectionId: number, access_token?: string) => {
    //1) Set page to loading and get token
    setPageLoadingState(true)
    let token = ''
    if (!access_token) {
      token = await getAccessToken()
    } else {
      token = access_token
    }

    // 2) Use token to get list of inventories for selected collection
    try {
      const inventories = await listInventories(token, collectionId)
      setInventoriesState(inventories)
    } catch (inventoriesError) {
      Logger.error('[LIST_INVENTORIES] Failed to get list of inventories for collectionId=', collectionId)
      setDialogState({
        title: 'Inventories Error',
        description: 'An unexpected error has occured while loading the inventories for this collection, please contact a developer or an administrator. We apologize for the inconvenience.',
        isError: true,
        showDialog: true,
        submitButtonText: 'Close'
      })
    } finally {
      setPageLoadingState(false)
    }
  }
  const uploadS3 = async (token: string, inventoryId: number, image: File) => {
    try {
      return (await uploadS3File(token, inventoryId, image))
    } catch (error) {
      Logger.error('Failed to upload file', error)
      throw 'Failed to upload file'
    }
  }
  const addNewInventory = async () => {
    setInventoryDialogState({
      ...inventoryDialogState,
      submitButtonLoading: true,
      submitButtonDisabled: true
    })
    // 1) Get the access token
    const token = await getAccessToken()
    // 2) Create inventory
    const collectionId = getSelectedCollectionId()
    try {
      if (!collectionId) {
        throw 'Collection id missing'
      }
      const { inventoryName, inventoryDescription, category, quantity, status, serialNumber, cost, salePrice, image } = inventoryDialogState
      const inventoryId = await createInventory(token, {
        collectionId,
        name: inventoryName,
        description: inventoryDescription,
        category,
        quantity,
        serialNumber,
        status,
        cost,
        salePrice
      })
      if (image) await uploadS3(token, inventoryId, image)
      getInventories(collectionId, token)
      setSnackbarState({
        showSnackbar: true,
        message: 'Inventory created.',
        theme: 'success'
      })
      closeInventoryDialog()
    } catch (addInventoryError) {
      Logger.error('[ADD_INVENTORY] Failed to add new inventory', addInventoryError)
      setInventoryDialogState({
        ...inventoryDialogState,
        showDialog: false,
        submitButtonLoading: false,
        submitButtonDisabled: false
      })
      setDialogError()
    }
  }
  const updateSelectedInventory = async () => {
    setInventoryDialogState({
      ...inventoryDialogState,
      submitButtonLoading: true,
      submitButtonDisabled: true
    })
    // 1) Get the access token
    const token = await getAccessToken()
    // 2) Update inventory
    const collectionId = getSelectedCollectionId()
    try {
      if (!collectionId) {
        throw 'Collection id missing'
      }
      const { inventoryId, inventoryName, inventoryDescription, category, quantity, status, image, serialNumber, cost, salePrice } = inventoryDialogState
      await Promise.all(
        [
          updateInventory(token, {
            id: inventoryId,
            name: inventoryName,
            description: inventoryDescription,
            category,
            quantity,
            serialNumber,
            status,
            cost,
            salePrice
          }),
          image && uploadS3(token, inventoryId, image)
        ]
      )
      closeInventoryDialog()
      getInventories(collectionId, token)
      setSnackbarState({
        showSnackbar: true,
        message: 'Inventory updated.',
        theme: 'success'
      })
    } catch (updateError) {
      Logger.error(`[UPDATE_INVENTORY] Failed to update inventory with id ${inventoryDialogState.inventoryId}`, updateError)
      setInventoryDialogState({
        ...inventoryDialogState,
        showDialog: false,
        submitButtonLoading: false,
        submitButtonDisabled: false
      })
      setDialogError()
    }
  }
  const deleteInventories = async (inventoryIds: number[]) => {
    const token = await getAccessToken()
    try {
      await Promise.all(inventoryIds.map(id => deleteInventory(token, id)))
      setSnackbarState({
        showSnackbar: true,
        message: inventoryIds.length > 1 ? 'Inventories deleted.' : 'Inventory deleted.',
        theme: 'success'
      })
    } catch (deleteError) {
      Logger.error('[DELETE_INVENTORIES] Failed to delete inventories with ids=', inventoryIds)
      setSnackbarState({
        showSnackbar: true,
        message: inventoryIds.length > 1 ? 'Error deleting inventories, please try again.' : 'Error deleting inventory, please try again.',
        theme: 'error'
      })
      const collectionId = getSelectedCollectionId()
      if (!collectionId) return
      getInventories(collectionId, token)
    }
  }
  // END - Inventories state

  // START - list of categories
  const [categoryList, setCategoryList] = useState([] as ListCategory[])
  const [categoryDialogState, setCategoryDialogState, onCategoryNameChange, openCategoryDialog, closeCategoryDialog, resetCategoryDialog] = useCategoryDialogState()
  const getCategoriesList = async (collectionId?: number, access_token?: string) => {
    let token = ''
    if (!access_token) {
      token = await getAccessToken()
    } else {
      token = access_token
    }
    if (!collectionId) {
      const id = getSelectedCollectionId()
      if (id) collectionId = id
    }

    try {
      if (!collectionId) {
        throw 'Collection id missing'
      }
      const categoryArr = await listCategories(token, collectionId)
      setCategoryList(categoryArr)
    } catch (categoryError) {
      Logger.error('[LIST_CATEGORY] Failed to get list of categories', categoryError)
      setDialogState({
        title: 'Categories Error',
        description: 'An unexpected error has occured while loading the list of categories for this collection, please contact a developer or an administrator. We apologize for the inconvenience.',
        isError: true,
        showDialog: true,
        submitButtonText: 'Close'
      })
    }
  }
  const handleCategoryDialogSubmit = async () => {
    setCategoryDialogState({
      ...categoryDialogState,
      loading: true
    })
    const collectionId = getSelectedCollectionId()
    const token = await getAccessToken()
    try {
      if (!collectionId) throw 'No collection id'
      await createCategory(token, {
        name: categoryDialogState.name,
        collectionId
      })
      resetCategoryDialog()
      getCategoriesList(collectionId, token)
      setSnackbarState({
        showSnackbar: true,
        message: 'Category created.',
        theme: 'success'
      })
    } catch (error) {
      Logger.error('[ADD_CATEGORY] Failed to add cateogry', error)
      setDialogError()
      setCategoryDialogState({
        ...categoryDialogState,
        loading: false
      })
    }
  }
  // END - list of categories

  // START - list of status
  const [statusList, setStatusList] = useState([] as ListStatus[])
  const [statusDialogState, setStatusDialogState, onStatusNameChange, openStatusDialog, closeStatusDialog, resetStatusDialog] = useStatusDialogState()
  const getStatusList = async (collectionId?: number, access_token?: string) => {
    let token = ''
    if (!access_token) {
      token = await getAccessToken()
    } else {
      token = access_token
    }
    if (!collectionId) {
      const id = getSelectedCollectionId()
      if (id) collectionId = id
    }

    try {
      if (!collectionId) {
        throw 'Collection id missing'
      }
      const statusArr = await listStatus(token, collectionId)
      setStatusList(statusArr)
    } catch (statusError) {
      Logger.error('[LIST_STATUS] Failed to get list of status', statusError)
      setDialogState({
        title: 'Status Error',
        description: 'An unexpected error has occured while loading the list of status for this collection, please contact a developer or an administrator. We apologize for the inconvenience.',
        isError: true,
        showDialog: true,
        submitButtonText: 'Close'
      })
    }
  }
  const handleStatusDialogSubmit = async () => {
    setStatusDialogState({
      ...statusDialogState,
      loading: true
    })
    const collectionId = getSelectedCollectionId()
    const token = await getAccessToken()
    try {
      if (!collectionId) throw 'No collection id'
      await createStatus(token, {
        name: statusDialogState.name,
        collectionId
      })
      getStatusList(collectionId, token)
      setSnackbarState({
        showSnackbar: true,
        message: 'Status created.',
        theme: 'success'
      })
      resetStatusDialog()
    } catch (error) {
      Logger.error('[ADD_STATUS] Failed to add status', error)
      setStatusDialogState({
        ...statusDialogState,
        loading: false
      })
      setDialogError()
    }
  }
  // END - list of status

  // Initial load after authentication
  useEffect(() => {
    if (isAuthenticated) {
      const getUserState = async () => {

        // 1) Get the access token
        const token = await getAccessToken()

        try {
          // 2) Get user details
          const userResponse = await getUser(token, user.email)
          setUserState({
            id: userResponse.id,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName
          })

          // 3) Use user id and get collections
          const collections = await getCollections(token, userResponse.id)
          if (!collections) return

          // 4) Use first collectionId to get inventories (First collection is selected by default)
          if (!collections.length) return
          const collectionId = collections[0].id
          getInventories(collectionId, token)
          getCategoriesList(collectionId, token)
          getStatusList(collectionId, token)
        } catch (userError) {
          Logger.error('[GET_USER] Failed to get user details', userError)
          if (userError.response && userError.response.status === 401) {
            setDialogState({
              title: 'Unauthorized Error',
              description: 'You are unauthorized to access this resource, please contact a developer or an administrator if you think this is a mistake.',
              isError: true,
              showDialog: true,
              submitButtonText: 'Close'
            })
          }
          setDialogError()
        }
      }
      getUserState()
    }
  }, [isAuthenticated])

  // Main dashboard state, this is where the inventories table is displayed
  const [pageLoadingState, setPageLoadingState] = useState(true)
  const mainDashboard = (): JSX.Element => {
    if (!isLoading && !isAuthenticated) {
      return (
        <Redirect to={'/' + Routes.SIGN_IN} />
      )
    } else if (pageLoadingState) {
      return (
        <Paper className={classes.paper}>
          <Typography className={classes.loading} component="h1" variant="h5" color="inherit" noWrap>
            <span>Loading ...</span>
          </Typography>
          <LinearProgress />
        </Paper>
      )
    } else if (!collectionsState.length) {
      return (
        <Paper className={classes.paper}>
          <img src={EmptyImage} className={classes.emptyImage} />
          <Button
            className={classes.newCollectionButton}
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() => { openCreateCollectionDialog() }}
          >
            New Collection
          </Button>
        </Paper>
      )
    }
    return (
      <Inventories
        openUpdateInventoryDialog={setInventoryDialogState}
        openCreateInventoryDialog={openCreateInventoryDialog}
        inventoriesState={inventoriesState}
        deleteInventories={deleteInventories}
      />
    )
  }

  const onFileUpload = (file: File) => {
    setInventoryDialogState({
      ...inventoryDialogState,
      image: file
    })
  }

  const clearFile = async () => {
    setInventoryDialogState({
      ...inventoryDialogState,
      image: undefined,
      s3Id: ''
    })
    // Means only update if created before
    if (inventoryDialogState.inventoryId) {
      const token = await getAccessToken()
      deleteFile(token, inventoryDialogState.inventoryId)
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        classes={classes}
        open={open}
        firstName={userState.firstName}
        lastName={userState.lastName}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        classes={classes}
        open={open}
        collectionsState={collectionsState}
        setCollectionsState={setCollectionsState}
        getInventories={getInventories}
        handleDrawerClose={handleDrawerClose}
        onLogoutClick={() => { logout() }}
      />
      <main className={classes.content}>
        <SimpleDialog
          title={dialogState.title}
          description={dialogState.description}
          submitButtonText={dialogState.submitButtonText}
          showDialog={dialogState.showDialog}
          cancelButtonText=""
          onSubmitClick={handleDialogSubmit}
          onCancelClick={handleCloseDialog}
          onCloseDialog={handleCloseDialog}
        />
        <Snackbar
          theme={snackbarState.theme}
          showSnackbar={snackbarState.showSnackbar}
          message={snackbarState.message}
          onClose={() => { closeSnackbar() }}
        />
        <CategoryDialog
          categoryDialogState={categoryDialogState}
          onCategoryNameChange={onCategoryNameChange}
          onSubmitClick={handleCategoryDialogSubmit}
          onCancelClick={closeCategoryDialog}
          onCloseDialog={closeCategoryDialog}
        />
        <StatusDialog
          statusDialogState={statusDialogState}
          onStatusNameChange={onStatusNameChange}
          onSubmitClick={handleStatusDialogSubmit}
          onCancelClick={closeStatusDialog}
          onCloseDialog={closeStatusDialog}
        />
        <CollectionDialog
          collectionDialogState={collectionDialogState}
          onCollectionNameChange={(val) => { onCollectionNameChange(val) }}
          onSubmitClick={() => addNewCollection()}
          onCancelClick={() => closeCollectionDialog()}
        />
        <InventoryDialog
          inventoryDialogState={inventoryDialogState}
          categoryList={categoryList}
          statusList={statusList}
          onInventoryFormChange={(key, value) => onInventoryFormChange(key, value)}
          onSubmitClick={() => { inventoryDialogState.submitButtonText === 'Create' ? addNewInventory() : updateSelectedInventory() }}
          onCancelClick={() => closeInventoryDialog()}
          addNewCategory={() => openCategoryDialog()}
          addNewStatus={() => openStatusDialog()}
          onFileUpload={(file) => onFileUpload(file)}
          clearFile={() => { clearFile() }}
        />
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Inventories */}
            <Grid item xs={12}>
              {
                mainDashboard()
              }
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}
