import * as ActionTypes from '../actions/types'

const initialState = {
  isCreateViewOpen: false,
  openUpdateViewId:''
}

export default function challengesReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_CREATE_CHALLENGE_VIEW:
      return { ...state, isCreateViewOpen: true }
    case ActionTypes.HIDE_CREATE_CHALLENGE_VIEW:
      return { ...state, isCreateViewOpen: false }
    case ActionTypes.SHOW_UPDATE_CHALLENGE_VIEW:
      return { ...state, openUpdateViewId: action.id }
    case ActionTypes.HIDE_UPDATE_CHALLENGE_VIEW:
      return { ...state, openUpdateViewId:'' }
    default:
      return state
  }
}
