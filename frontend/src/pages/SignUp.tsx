import React, { useState } from 'react'
import Logger from 'loglevel'
import BlankNavbar from '../components/common/BlankNavbar'
import { Typography, Link, makeStyles, Container, CssBaseline, Avatar, Grid, TextField, Box } from '@material-ui/core'
import LoadingButton from '../components/common/LoadingButton'
import { CreateUserFormInterface } from '../interfaces/user'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { createUser } from '../services/user'
import SimpleDialog from '../components/common/SimpleDialog'
import { useAuth0 } from '@auth0/auth0-react'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      DEMO VERSION&nbsp;
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
  const { loginWithRedirect } = useAuth0();

  const [dialogState, setDialogState] = useState({
    title: '',
    description: '',
    isError: false,
    showDialog: false,
    submitButtonText: ''
  })
  const handleDialogSubmit = () => {
    if (dialogState.isError) {
      handleCloseDialog()
      return
    }
    loginWithRedirect()
  }
  const handleCloseDialog = () => {
    setDialogState({
      ...dialogState,
      showDialog: false
    })
  }

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
    try {
      await createUser(state)
      setDialogState({
        title: 'Successfully signed up',
        description: 'You have successfully signed up! Proceed to sign in now by clicking on the button below.',
        submitButtonText: 'Sign In',
        showDialog: true,
        isError: false
      })
    } catch (error) {
      Logger.error('[CREATE_USER] Failed to create new staff', error)
      let errorDescription = 'An unexpected error has occured, please contact a developer or an administrator. We apologize for the inconvenience caused.'
      if (error.response && error.response.status === 400) {
        errorDescription = 'An error has occured, please make sure that the form is correctly filled up. First name, last name, email address, and password are required fields.'
      }
      setDialogState({
        title: 'Error signing up',
        description: errorDescription,
        submitButtonText: 'Close',
        showDialog: true,
        isError: true
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <>
      <BlankNavbar />
      <Container component="main" maxWidth="xs">
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
                <Link href="/signin" variant="body2">
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
