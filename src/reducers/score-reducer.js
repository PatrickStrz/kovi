import * as ActionTypes from '../actions/types'

const initialState = {
  communityScore: null,
  communityScoreEventId:'',
  communityAnimation1: true,
  communityAnimation2: false,
  userScore: '',
  userScoreEventId:'',
  userAnimation1: true,
  userAnimation2: false,
}

const updateCommunityScore = (state, action) => {
  // protect from duplicate events causing score to be our of sync with server:
  if (state.communityScoreEventId === action.scoreId){
    return state.communityScore
  }
  else if (state.communityScoreEventId !== action.scoreId) {
    return({
      // animation hack - switching between 2 animation states acts as a reset :
      communityAnimation1: !state.communityAnimation1,
      communityAnimation2: !state.communityAnimation2,
      communityScoreEventId: action.scoreId,
      communityScore: state.communityScore + action.value,
    })
  }
}

const updateUserScore = (state, action) => {
  // protect from duplicate events causing score to be our of sync with server:
  if (state.userScoreEventId === action.scoreId){
    return state.userScore
  }
  else if (state.userScoreEventId !== action.scoreId) {
    return({
      // animation hack - switching between 2 animation states acts as a reset :
      userAnimation1: !state.userAnimation1,
      userAnimation2: !state.userAnimation2,
      userScoreEventId: action.scoreId,
      userScore: state.userScore + action.value,
    })
  }
}

export default function scoreReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.INITIAL_COMMUNITY_SCORE:
      return {...state, communityScore: action.value}
    case ActionTypes.NEW_COMMUNITY_SCORE:
      const updatedCommunityState = updateCommunityScore(state, action)
      return {
        ...state,
        ...updatedCommunityState
      }
    case ActionTypes.INITIAL_USER_SCORE:
      return {...state, userScore: action.value}
    case ActionTypes.NEW_USER_SCORE:
      const updatedUserState = updateUserScore(state, action)
      return {
        ...state,
        ...updatedUserState
    }
    default:
      return state
  }
}
