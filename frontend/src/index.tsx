import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider";
import SignUp from './pages/SignUp'

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
