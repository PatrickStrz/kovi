import { combineReducers } from 'redux'
import auth from './auth-reducer'
import challenges from './challenges-reducer'
import scores from './score-reducer'
import editor from './editor-reducer'

const appRootReducer = combineReducers({
  auth,
  challenges,
  scores,
  editor,
})

export default appRootReducer
