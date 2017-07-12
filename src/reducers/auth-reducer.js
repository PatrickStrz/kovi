import * as ActionTypes from '../actions/types'
import AuthService from '../lib/AuthService'

const initialState = {
  auth0Authenticated: !AuthService.isTokenExpired(),
  isFetching: false,
  profile: AuthService.getProfile(),
  userSynced: AuthService.getApiUserId() ? true : false ,
  error: null,
  apiUserId: AuthService.getApiUserId(),
  apiUserScorecardId: AuthService.getApiUserScorecardId(),
  isAuthenticated: (
    !AuthService.isTokenExpired()
    &&
    AuthService.getApiUserId()
    &&
    AuthService.getApiUserScorecardId()
    &&
    true
    //returns true if all conditions are met.
  )
    ,
}

export default function authReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, isFetching: true, error: null }
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        auth0Authenticated: true,
        profile: action.profile
      }
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        auth0Authenticated: false,
        profile: {},
        error: action.error
      }
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
        auth0Authenticated:false,
        profile: {},
        userSynced: false,
        apiUserId:'',
        apiUserScorecardId: '',
        isAuthenticated: false,
      }
    case ActionTypes.USER_SYNC_SUCCESS:
      return {
        ...state,
        userSynced: true,
        apiUserId: action.apiUserId,
        apiUserScorecardId: action.apiUserScorecardId,
        isAuthenticated: true
      }
    default:
      return state
  }
}
