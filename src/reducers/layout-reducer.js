import * as ActionTypes from '../actions/types'

const initialState = {isScreenVisible: true, }

export default function layoutReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.HIDE_SCREEN:
      return {...state, isScreenVisible: false}
    case ActionTypes.SHOW_SCREEN:
      return {...state, isScreenVisible: true}
    default:
      return state
  }
}
