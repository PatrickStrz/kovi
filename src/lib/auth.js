import AuthService from '../lib/AuthService'
const authService = new AuthService(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN
)

export const checkLogin = ()=> {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', authResult => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error)
          console.log('there was an error')
        // console.log('profile:'+profile)
        AuthService.setToken(authResult.idToken) // static method
        AuthService.setProfile(profile) // static method
        //redirect to signup page to sync up user.
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', error => console.log('there was an error'))
}

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
