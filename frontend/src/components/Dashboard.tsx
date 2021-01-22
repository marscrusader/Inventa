
import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Inventories from './Inventory'
import { Redirect } from 'react-router-dom'
import { Routes } from '../interfaces/router'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import Logger from 'loglevel'
import { getUser } from '../services/user'
import SimpleDialog from './common/SimpleDialog'
import { createCollection, listCollections } from '../services/collection'
import { CollectionStateInterface, ListCollectionResponse } from '../interfaces/collection'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
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
import { listInventories } from '../services/inventory'
import { ListInventoryResponse } from '../interfaces/inventory'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
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
        message: 'Collection created.'
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
  // END - Collections state

  // START - Inventories state
  const [inventoriesState, setInventoriesState] = useState([] as ListInventoryResponse[])
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
      console.log(inventories)
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
  // END - Inventories state

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
          getInventories(collections[0].id, token)
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
    return (<Inventories inventoriesState={inventoriesState} />)
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
          showSnackbar={snackbarState.showSnackbar}
          message={snackbarState.message}
          onClose={() => { closeSnackbar() }}
        />
        <CollectionDialog
          title={collectionDialogState.title}
          showDialog={collectionDialogState.showDialog}
          description={collectionDialogState.description}
          submitButtonText={collectionDialogState.submitButtonText}
          submitButtonLoading={collectionDialogState.submitButtonLoading}
          submitButtonDisabled={collectionDialogState.submitButtonDisabled}
          collectionName={collectionDialogState.collectionName}
          onCollectionNameChange={(val) => { onCollectionNameChange(val) }}
          onSubmitClick={() => addNewCollection()}
          onCancelClick={() => closeCollectionDialog()}
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
