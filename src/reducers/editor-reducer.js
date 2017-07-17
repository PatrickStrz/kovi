import * as ActionTypes from '../actions/types'

const initialState = {editorHtml:'', }

export default function editorReducer(state=initialState, action){
  switch (action.type) {
  case ActionTypes.EDITOR_CHANGE:
    return { ...state, editorHtml: action.html }
  default:
    return state
  }
}
