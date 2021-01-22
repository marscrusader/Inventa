import React from "react"
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Avatar from '@material-ui/core/Avatar'
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined'
import ListSubheader from '@material-ui/core/ListSubheader'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import { AppDrawerInterface } from "../interfaces/components"


export default function AppDrawer({ classes, open, collectionsState, setCollectionsState, getInventories, handleDrawerClose, onLogoutClick }: AppDrawerInterface): JSX.Element {
  const handleOnCollectionClick = (collectionId: number, collectionIsSelected: boolean) => {
    // Don't load inventories again if already selected
    if (collectionIsSelected) return

    // 1) Set previous selected collection's "selected" prop to false
    const previousSelectedCollection = collectionsState.find(collection => collection.selected)
    if (previousSelectedCollection) previousSelectedCollection.selected = false

    // 2) Set newly selected collections's "selected" prop to true
    const selectedCollection = collectionsState.find(collection => collection.id === collectionId)
    if (selectedCollection) selectedCollection.selected = true

    // 3) Update collections state
    setCollectionsState(collectionsState)

    // 4) Update inventories table
    getInventories(collectionId)
  }

  return (
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
        <ListSubheader inset>{collectionsState.length ? 'Collections' : 'No Collections'}</ListSubheader>
        {
          collectionsState.map(collection => {
            return (
              <ListItem key={collection.id} selected={collection.selected} onClick={() => { handleOnCollectionClick(collection.id, collection.selected) }} button>
                <ListItemIcon>
                  <Avatar className={classes.avatarListIcon}>{collection.name.charAt(0)}</Avatar>
                </ListItemIcon>
                <ListItemText primary={collection.name} />
              </ListItem>
            )
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
        <ListItem button className={classes.signOutListItem} onClick={onLogoutClick}>
          <ListItemIcon className={classes.signOutListItem}>
            <LaunchOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Drawer>
  )
}
