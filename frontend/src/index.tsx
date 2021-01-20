import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Auth0ProviderWithHistory from "./auth/auth0-provider"
import SignUp from './pages/SignUp'
import { Routes } from './interfaces/router'
import SignIn from './pages/SignIn'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#023E8A',
      main: '#023E8A'
    },
    secondary: {
      main: '#48CAE4',
      dark: '#00B4D8'
    },
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <Auth0ProviderWithHistory>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path={'/' + Routes.SIGN_UP} component={SignUp} />
          <Route path={'/' + Routes.SIGN_IN} component={SignIn} />
        </Switch>
      </Auth0ProviderWithHistory>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
