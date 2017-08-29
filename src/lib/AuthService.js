import Auth0Lock from 'auth0-lock'
import jwtDecode from 'jwt-decode'
import {muiColors} from 'styles/theme/colors'
import logo from 'logo.svg'

const ROOT_ROUTE = '/'

// extension of: https://github.com/amaurymartiny/react-redux-auth0-kit

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0 lock
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: `${window.location.origin}${ROOT_ROUTE}`,
        responseType: 'token'
      },
      theme: {
        logo: logo,
        primaryColor: muiColors.primary1
      },
      languageDictionary: {
        title: ''
      }
    })
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  // ======================================================
  // Public methods
  // ======================================================
  isLocalStorageSupported() {
  var testKey = 'test', storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

  login() {
    // Call the show method to display the widget.
    if(this.isLocalStorageSupported()){
      this.lock.show()
    }
    else{
      alert(`
        Login currently unavailable when browsing in private mode on mobile devices,
        please switch to normal mode to log in.
      `)
    }
  }

  logout(){
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    localStorage.removeItem('auth0_user_id')
    localStorage.removeItem('user_synced')
    localStorage.removeItem('api_user_id')
    localStorage.removeItem('api_user_scorecard_id')
  }

  // ======================================================
  // Static methods
  // ======================================================
  static getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken()
    return !!token && !AuthService.isTokenExpired(token)
  }

  static setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
  }

  static setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  static setApiUserId(apiUserId){
    localStorage.setItem('api_user_id', apiUserId )
  }

  static setApiUserScorecardId(apiUserScorecardId){
    localStorage.setItem('api_user_scorecard_id', apiUserScorecardId )
  }

  static getToken() {
    return localStorage.getItem('id_token')
  }

  static getApiUserId() {
    return localStorage.getItem('api_user_id')
  }

  static getApiUserScorecardId() {
    return localStorage.getItem('api_user_scorecard_id')
  }

  static getTokenExpirationDate() {
    const token = AuthService.getToken()
    const decoded = jwtDecode(token)
    if(!decoded.exp) {
      return null
    }

    const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp)
    return date
  }

  static isTokenExpired() {
    const token = AuthService.getToken()
    if (!token) return true
    const date = AuthService.getTokenExpirationDate(token)
    const offsetSeconds = 0
    if (date === null) {
      return false
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
  }
}
