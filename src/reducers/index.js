import { combineReducers } from 'redux'
import auth from './auth-reducer'
import challenges from './challenges-reducer'

const appRootReducer = combineReducers({
  auth,
  challenges
})

export default appRootReducer
