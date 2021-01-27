import React from "react"
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core"
import isMobile from "../../utils/isMobile"

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24,
    display: 'flex',
    justifyContent: 'space-between'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  linkTag: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
}))

export default function BlankNavbar(): JSX.Element {
  const classes = useStyles()

  return (
    <AppBar position="absolute">
      <Toolbar className={classes.toolbar}>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          <a href='/' className={classes.linkTag}>Inventa</a>
        </Typography>
        <Typography component="h1" variant={isMobile() ? "caption" : "subtitle1"} color="inherit" noWrap>
          <span>INVENTORY MANAGEMENT PLATFORM (MVP)</span>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
