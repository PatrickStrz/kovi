import { combineReducers } from 'redux'
import auth from './auth-reducer'

const appRootReducer = combineReducers({
  auth
})

export default appRootReducer
