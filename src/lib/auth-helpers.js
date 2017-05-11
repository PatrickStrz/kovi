import AuthService from '../lib/AuthService'
const authService = new AuthService(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN
)

export function checkLogin() {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', authResult => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error)
          console.log('there was an error')
        // console.log('profile:'+profile)
        AuthService.setToken(authResult.idToken) // static method
        AuthService.setProfile(profile) // static method
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', error => console.log('there was an error'))
}


// export function checkLogin() {
//   return dispatch => {
//     // Add callback for lock's `authenticated` event
//     authService.lock.on('authenticated', authResult => {
//       authService.lock.getProfile(authResult.idToken, (error, profile) => {
//         if (error)
//           return dispatch(loginError(error))
//         AuthService.setToken(authResult.idToken) // static method
//         AuthService.setProfile(profile) // static method
//         // syncUser()
//         dispatch(syncUser(profile))
//         return dispatch(loginSuccess(profile))
//       })
//     })
//     // Add callback for lock's `authorization_error` event
//     authService.lock.on('authorization_error', error => dispatch(loginError(error)))
//   }
// }

export function login() {

  authService.login()

}

// export const checkLogin = () => {
//   authService.lock.on('authenticated', authResult => {
//
//   })
// }
