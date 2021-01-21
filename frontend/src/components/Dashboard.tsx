
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import isMobile from '../utils/isMobile'
import Avatar from '@material-ui/core/Avatar'
import Inventories from './Inventory'
import { useAuth0 } from '@auth0/auth0-react'
import { Redirect } from 'react-router-dom'
import { Routes } from '../interfaces/router'
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import ListSubheader from '@material-ui/core/ListSubheader'
import Logger from 'loglevel'
import { getUser } from '../services/user'
import SimpleDialog from './common/SimpleDialog'
import { createCollection, listCollections } from '../services/collection'
import { CollectionDialogInterface, ListCollectionResponse } from '../interfaces/collection'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import CollectionDialog from './collection/CollectionDialog'
import Snackbar from './common/Snackbar'
import { useDashboardStyles } from '../styles/dashboard'
import EmptyImage from '../static/empty.jpg'
import { useDialogState } from '../state/dialogState'
import { useSnackbarState } from '../state/snackbarState'


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

  // Auth state
  const { isAuthenticated, isLoading, user, logout, getAccessTokenSilently } = useAuth0()
  const getAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently()
      return token
    } catch (tokenError) {
      Logger.error('Get token error', tokenError)
      return ''
    }
  }

  // Drawer state
  const [open, setOpen] = useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  // User state
  const [userState, setUserState] = useState({
    id: 0,
    firstName: '',
    lastName: ''
  })

  // Dialog state
  const [dialogState, setDialogState, setDialogError, handleDialogSubmit, handleCloseDialog] = useDialogState()

  // Snackbar state
  const [snackbarState, setSnackbarState, closeSnackbar] = useSnackbarState()

  // Collections state
  const [collectionsState, setCollectionsState] = useState([] as ListCollectionResponse[])
  const [collectionDialogState, setCollectionDialogState] = useState({
    title: '',
    collectionName: '',
    description: '',
    submitButtonText: '',
    showDialog: false,
    submitButtonLoading: false,
    submitButtonDisabled: false,
  } as CollectionDialogInterface)
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
  const closeCollectionDialog = () => {
    setCollectionDialogState({
      ...collectionDialogState,
      showDialog: false
    })
  }
  const openCreateCollectionDialog = () => {
    setCollectionDialogState({
      ...collectionDialogState,
      collectionName: '',
      title: 'Create a new collection',
      description: 'Enter the name of the collection and click on the "Create" button',
      submitButtonText: 'Create',
      showDialog: true
    })
  }
  const onCollectionNameChange = (collectionName: string) => {
    setCollectionDialogState({
      ...collectionDialogState,
      collectionName
    })
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
  const mainDashboard = () => {
    if (!isLoading && !isAuthenticated) {
      return (
        <Redirect to={'/' + Routes.SIGN_IN} />
      )
    } else if (pageLoadingState) {
      return (
        <>
          <Typography className={classes.loading} component="h1" variant="h5" color="inherit" noWrap>
            <span>Loading ...</span>
          </Typography>
          <LinearProgress />
        </>
      )
    } else if (!collectionsState.length) {
      return (
        <>
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
        </>
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

        // 2) Get user detrails
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
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <a href='/' className={classes.linkTag}>Inventa</a>
          </Typography>
          <Typography component="h1" variant={isMobile() ? "caption" : "subtitle1"} color="inherit" noWrap>
            <span>{`${userState.firstName} ${userState.lastName}`}</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListSubheader inset>Collections</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <Avatar className={classes.avatarListIcon}>H</Avatar>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {
            collectionsState.map(collection => {
              <ListItem button>
                <ListItemIcon>
                  <Avatar className={classes.avatarListIcon}>{collection.name.charAt(0)}</Avatar>
                </ListItemIcon>
                <ListItemText primary={collection.name} />
              </ListItem>
            })
          }
        </List>
        <Divider />
        <List>
          <ListItem button className={classes.newCollectionListItem}>
            <ListItemIcon className={classes.newCollectionListItem}>
              <AddCircleOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="New Collection" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button className={classes.signOutListItem} onClick={() => { logout() }}>
            <ListItemIcon className={classes.signOutListItem}>
              <LaunchOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
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
              <Paper className={classes.paper}>
                {
                  mainDashboard()
                }
              </Paper>
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
