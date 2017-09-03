import * as ActionTypes from '../actions/types'

const initialState = {communityScore: null, scoreEventId:'' ,animation1: true, animation2: false}

const updateCommunityScore = (state, action) => {
  // protect from duplicate events causing score to be our of sync with server:
  if (state.scoreEventId === action.scoreId){
    return state.communityScore
  }
  else if (state.scoreEventId !== action.scoreId) {
    return({
      // animation hack - switching between 2 animation states acts as a reset :
      animation1: !state.animation1,
      animation2: !state.animation2,
      scoreEventId: action.scoreId,
      communityScore: state.communityScore + action.value,
    })
  }
}

export default function scoreReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.INITIAL_COMMUNITY_SCORE:
      return {...state, communityScore: action.value}
    case ActionTypes.NEW_COMMUNITY_SCORE:
      const updatedState = updateCommunityScore(state, action)
      return {
        ...state,
        ...updatedState
      }
    default:
      return state
  }
}
