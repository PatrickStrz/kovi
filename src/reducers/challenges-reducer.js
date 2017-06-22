import * as ActionTypes from '../actions/types'

const initialState = {
  showCreateChallengeView: false,
  openUpdateViewId:''
}

export default function challengesReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_CREATE_CHALLENGE_VIEW:
      return { ...state, showCreateChallengeView: true }
    case ActionTypes.HIDE_CREATE_CHALLENGE_VIEW:
      return { ...state, showCreateChallengeView: false }
    case ActionTypes.SHOW_UPDATE_CHALLENGE_VIEW:
      return { ...state, isUpdateViewOpen: true, openUpdateViewId: action.id }
    case ActionTypes.HIDE_UPDATE_CHALLENGE_VIEW:
      return { ...state, isUpdateViewOpen: false, openUpdateViewId:'' }
    default:
      return state
  }
}
