import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import BlankNavbar from '../components/common/BlankNavbar'
import SideImage from '../static/sideImage.jpg'
import { Divider } from '@material-ui/core'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined'
import { Routes } from '../interfaces/router'
import { useAuth0 } from '@auth0/auth0-react';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${SideImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '85%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  demoText: {
    fontWeight: 'bold'
  }
}))

export default function SignInSide(): JSX.Element {
  const classes = useStyles()
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <BlankNavbar />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Have an account?
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              endIcon={<ExitToAppOutlinedIcon />}
              onClick={() => loginWithRedirect()}
            >
              Sign In
            </Button>
            <span>
              <span className={classes.demoText}>Demo User:&nbsp;</span>
              <span>x86@example.com</span>
            </span>
            <span>
              <span className={classes.demoText}>Demo Password:&nbsp;</span>
              <span>Abcd123$</span>
            </span>
            <Typography component="span" variant="caption" color="inherit" align="center">
              <span>I have provided a demo user above, or you can optionally create your own in sign up.</span>
            </Typography>
            <Box mt={5} mb={5} width='100%'>
              <Divider />
            </Box>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Or join us!
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              endIcon={<HowToRegOutlinedIcon />}
              component={Link}
              to={'/' + Routes.SIGN_UP}
            >
              Sign Up
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
