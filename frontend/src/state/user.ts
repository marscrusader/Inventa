import { LogoutOptions, useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import Logger from 'loglevel'
import { UserStateInterface } from "../interfaces/user"

export const useUserState = (): [
  boolean,
  boolean,
  any,
  (options?: LogoutOptions | undefined) => void,
  () => Promise<string>,
  UserStateInterface,
  (state: UserStateInterface) => void
] => {
  const { isAuthenticated, isLoading, user, logout, getAccessTokenSilently } = useAuth0()

  const getAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently()
      return token
    } catch (tokenError) {
      Logger.error('Get token error', tokenError)
      return ''
    }
  }
  const [userState, _setUserState] = useState({
    id: 0,
    firstName: '',
    lastName: ''
  })

  const setUserState = (state: UserStateInterface) => {
    _setUserState(state)
  }

  return [
    isAuthenticated,
    isLoading,
    user,
    logout,
    getAccessToken,
    userState,
    setUserState
  ]
}
