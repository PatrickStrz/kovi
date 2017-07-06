import * as ActionTypes from '../actions/types'

const initialState = {
  communityScore: null,
}

export default function challengesReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.INITIAL_COMMUNITY_SCORE:
      return { ...state, communityScore: action.value }
    case ActionTypes.NEW_COMMUNITY_SCORE:
      return { ...state, communityScore: state.communityScore + action.value}
    default:
      return state
  }
}
