import { combineReducers } from 'redux'
import auth from './auth-reducer'
import challenges from './challenges-reducer'
import scores from './score-reducer'
import editor from './editor-reducer'
import community from './community-reducer'
import bottomBar from './bottombar-reducer'
import alerts from './alert-reducer'
import products from './product-reducer'

const appRootReducer = combineReducers({
  alerts,
  auth,
  bottomBar,
  challenges,
  community,
  editor,
  scores,
  products
})

export default appRootReducer
