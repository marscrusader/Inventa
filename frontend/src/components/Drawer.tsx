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
import { ListCollectionResponse } from "../interfaces/collection"


interface AppDrawerInterface {
  classes: Record<any, string>;
  open: boolean;
  collectionsState: ListCollectionResponse[];
  handleDrawerClose: () => void;
  onLogoutClick: () => void;
}

export default function AppDrawer({ classes, open, collectionsState, handleDrawerClose, onLogoutClick }: AppDrawerInterface): JSX.Element {
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
