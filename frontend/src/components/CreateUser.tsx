import React, { FormEvent, useState } from "react"
import { Avatar, CssBaseline, TextField, Paper, Grid, Typography, makeStyles } from '@material-ui/core'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import logger from 'loglevel'
import LoadingButton from "./common/LoadingButton"
import { CreateUserFormInterface } from '../interfaces/user'


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(img/wallpaper2-min.PNG)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  idTypeSelect: {
    padding: "8px",
    paddingTop: "4.6%"
  },
  cancelButton: {
    marginLeft: '1%'
  },
  submitButtonGroup: {
    marginTop: "4%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  additionalInfo: {
    marginTop: "3%"
  }
}))

export default function CreateUser(): JSX.Element {
  const classes = useStyles()

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  } as CreateUserFormInterface)
  const [submitLoading, setSubmitLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    logger.info("[CREATE_USER] Form submission triggered", state)
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container justify="center" className={classes.image}>
        <Grid
          item
          xs={12}
          sm={10}
          component={Paper}
          elevation={6}
          square
        >
          <Grid className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New Staff
              </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item sm>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="First Name"
                    id="first-name"
                    name="first-name"
                    autoComplete="first-name"
                    autoFocus
                    autoCapitalize='on'
                    value={state.firstName}
                    onChange={(e) => setState({ ...state, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item sm>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    name="last-name"
                    id="last-name"
                    autoComplete="last-name"
                    autoFocus
                    autoCapitalize='on'
                    value={state.lastName}
                    onChange={(e) => setState({ ...state, lastName: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                  />
                </Grid>
                <Grid item sm>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    autoFocus
                    value={state.password}
                    onChange={(e) => setState({ ...state, password: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.submitButtonGroup}>
                <LoadingButton
                  text="Sign Up"
                  color="primary"
                  loading={submitLoading}
                  disabled={submitLoading}
                  onClick={handleSubmit}
                >
                </LoadingButton>
                <LoadingButton
                  buttonStyle={classes.cancelButton}
                  text="Cancel"
                  color="primary"
                  onClick={() => { console.log('cancel') }}
                >
                </LoadingButton>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
