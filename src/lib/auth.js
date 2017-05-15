import AuthService from '../lib/AuthService'
const authService = new AuthService(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN
)

export const logout = () => {
  authService.logout()
}

export const login = () => {
  authService.login()
}

export const isLoggedIn = () => {
  return authService.loggedIn()
}

export const requireAuth = callback => {
    if(AuthService.loggedIn()){
      callback()
    }
    else {
      login()
    }
}
