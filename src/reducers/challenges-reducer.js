import * as ActionTypes from '../actions/types'

const initialState = {
  showCreateChallengeView: false
}

export default function challengesReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_CREATE_CHALLENGE_VIEW:
      return { ...state, showCreateChallengeView: true }
    case ActionTypes.HIDE_CREATE_CHALLENGE_VIEW:
      return { ...state, showCreateChallengeView: false }
    default:
      return state
  }
}
