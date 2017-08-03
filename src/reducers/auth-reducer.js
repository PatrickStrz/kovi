import * as ActionTypes from '../actions/types'
import AuthService from '../lib/AuthService'

const isAuthenticated = () => {
  if (!AuthService.isTokenExpired() &&
      AuthService.getApiUserId() &&
      AuthService.getApiUserScorecardId()) {
    return true
  }
  else {
    return false
  }
}

const isUserSyncRequired = () => {
  if(
    !AuthService.loggedIn() ||
    !AuthService.getApiUserId() ||
    !AuthService.getApiUserId()
  ){
    return true
  }
  else {
    return false
  }
}

//------------- reducer code -------------//

const initialState = {
  auth0Authenticated: AuthService.loggedIn(),
  isFetching: false,
  profile: AuthService.getProfile(),
  userSyncRequired: isUserSyncRequired(),
  error: null,
  apiUserId: AuthService.getApiUserId(),
  apiUserScorecardId: AuthService.getApiUserScorecardId(),
  isAuthenticated: isAuthenticated()
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
        apiUserId: action.apiUserId,
        userSyncRequired: false,
        apiUserScorecardId: action.apiUserScorecardId,
        isAuthenticated: true
      }
    default:
      return state
  }
}
