import { combineReducers } from 'redux'
import auth from './auth-reducer'
import challenges from './challenges-reducer'
import scores from './score-reducer'
import editor from './editor-reducer'
import layout from './layout-reducer'

const appRootReducer = combineReducers({
  auth,
  challenges,
  scores,
  editor,
  layout,
})

export default appRootReducer
