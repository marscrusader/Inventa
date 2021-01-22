import React from "react"
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import isMobile from "../utils/isMobile"
import { AppBarProps } from '../interfaces/components'


export default function Appbar({ handleDrawerOpen, open, classes, firstName, lastName }: AppBarProps): JSX.Element {
  return (
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
          <span>{`${firstName} ${lastName}`}</span>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
