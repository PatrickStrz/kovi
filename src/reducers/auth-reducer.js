import AuthService from '../lib/AuthService'

const initialState = {
  isAuthenticated: !AuthService.isTokenExpired(),
  profile: AuthService.getProfile(),
}
export default function authReducer(state=initialState, action) {
      return state
}
