import { combineReducers } from 'redux'
import auth from './auth-reducer'
import challenges from './challenges-reducer'
import scores from './score-reducer'
import editor from './editor-reducer'
import community from './community-reducer'
import bottomBar from './bottombar-reducer'
const appRootReducer = combineReducers({
  auth,
  challenges,
  scores,
  editor,
  community,
  bottomBar,
})

export default appRootReducer
