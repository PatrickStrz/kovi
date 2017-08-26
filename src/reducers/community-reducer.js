import * as ActionTypes from 'actions/types'

const initialState = {openDiscusionId:''}

export default function(state=initialState, action){
  switch (action.type) {
    case ActionTypes.SHOW_DISCUSSION_VIEW:
      return {...state, openDiscusionId: action.id }
    case ActionTypes.HIDE_DISCUSSION_VIEW:
      return {...state, openDiscusionId: action.id }
    default:
      return state
  }
}
