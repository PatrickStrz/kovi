import { combineReducers } from 'redux'
import auth from './auth-reducer'
import challenges from './challenges-reducer'
import scores from './score-reducer'

const appRootReducer = combineReducers({
  auth,
  challenges,
  scores
})

export default appRootReducer
