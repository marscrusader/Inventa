import React, { useState } from 'react'
import Logger from 'loglevel'
import BlankNavbar from '../components/common/BlankNavbar'
import { Typography, Link, makeStyles, Container, CssBaseline, Avatar, Grid, TextField, Box } from '@material-ui/core'
import LoadingButton from '../components/common/LoadingButton'
import { CreateUserFormInterface } from '../interfaces/user'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'


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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignUpPage(): JSX.Element {
  const classes = useStyles()

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  } as CreateUserFormInterface)
  const [submitLoading, setSubmitLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    Logger.info("[CREATE_USER] Form submission triggered", state)
    e.preventDefault()
    setSubmitLoading(true)
    // try {
    //   await createUser(state)
    // } catch (error) {
    //   logger.error('[CREATE_USER] Failed to create new staff', error)
    // } finally {
    //   setSubmitLoading(false)
    // }
  }
  return (
    <>
      <BlankNavbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={state.firstName}
                  onChange={(e) => setState({ ...state, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={state.lastName}
                  onChange={(e) => setState({ ...state, lastName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={state.password}
                  onChange={(e) => setState({ ...state, password: e.target.value })}
                />
              </Grid>
            </Grid>
            <LoadingButton
              buttonStyle={classes.submit}
              text="Sign Up"
              color="primary"
              loading={submitLoading}
              disabled={submitLoading}
              onClick={handleSubmit}
            >
            </LoadingButton>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}
