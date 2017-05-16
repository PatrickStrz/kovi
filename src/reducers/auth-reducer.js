import * as ActionTypes from '../actions/types'
import AuthService from '../lib/AuthService'

const initialState = {
  isAuthenticated: !AuthService.isTokenExpired(),
  isFetching: false,
  profile: AuthService.getProfile(),
  error: null,
}

export default function authReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, isFetching: true, error: null }
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, isFetching: false, isAuthenticated: true, profile: action.profile }
    case ActionTypes.LOGIN_ERROR:
      return { ...state, isFetching: false, isAuthenticated: false, profile: {}, error: action.error }
    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, ...initialState, isAuthenticated:false, profile: {} }
    default:
      return state
  }
}
