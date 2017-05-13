// import { browserHistory } from 'react-router'
import AuthService from '../lib/AuthService'
import * as ActionTypes from './types'

const authService = new AuthService(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN
)

// Listen to authenticated event from AuthService and get the profile of the user
// Done on every page startup
export function checkLogin() {
  return dispatch => {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', authResult => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error)
          return dispatch(loginError(error))
        AuthService.setToken(authResult.idToken) // static method
        AuthService.setProfile(profile) // static method
        // syncUser()
        // dispatch(syncUser(profile))
        return dispatch(loginSuccess(profile))
        // return dispatch(loginSuccess)
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', error => dispatch(loginError(error)))
  }
}

//Calls the function that is passed in if logged in with Auth0 and
//the profile is created/ synced with the API
// export const requireAuth = callback => {
//   return dispatch => {
//     if(AuthService.loggedIn() && AuthService.getApiUserId()){
//       callback()
//     }
//     else if (AuthService.loggedIn() && !AuthService.getApiUserId()) {
//       const profile = AuthService.getProfile()
//         dispatch(syncUser(profile))
//       }
//     else {
//       dispatch(login())
//     }
//   }
// }

export function login() {
  authService.login()
  return {
    type: ActionTypes.LOGIN_REQUEST
  }
}

export function loginSuccess(profile) {
  // browserHistory.push('/')
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    profile
  }
}

export function loginError(error) {
  return {
    type: ActionTypes.LOGIN_ERROR,
    error
  }
}

export function logout() {
  authService.logout()
  // browserHistory.push('/signedOut')
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

// to keep profile up to date with api (creates or updates user)
