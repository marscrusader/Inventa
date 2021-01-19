import React from 'react'
import logo from './logo.svg'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './components/common/loginButton'
import LogoutButton from './components/common/logoutButton'

export default function App(): JSX.Element {
  const { isAuthenticated } = useAuth0()

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        {
          isAuthenticated ? <LogoutButton /> : <LoginButton />
        }
      </header>
    </div>
  )
}
