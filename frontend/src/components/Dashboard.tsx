
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
import { ListCollectionResponse } from '../interfaces/collection'
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

  // Collections state
  const [collectionsState, setCollectionsState] = useState([] as ListCollectionResponse[])
  const [
    collectionDialogState,
    setCollectionDialogState,
    openCreateCollectionDialog,
    closeCollectionDialog,
    onCollectionNameChange
  ] = useCollectionDialogState()
  const getCollections = async (token: string, userId: number) => {
    try {
      const collections = await listCollections(token, userId)
      setCollectionsState(collections)
    } catch (collectionError) {
      Logger.error('[LIST_COLLECTION] Failed to get collections', collectionError)
      setDialogError()
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
    return (<Inventories />)
  }

  // Initial load after authentication
  useEffect(() => {
    if (isAuthenticated) {
      const getUserState = async () => {

        // 1) Get the access token
        const token = await getAccessToken()

        // 2) Get user details
        try {
          const userResponse = await getUser(token, user.email)
          setUserState({
            id: userResponse.id,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName
          })

          // 3) Use user id and get collections
          getCollections(token, userResponse.id)
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
