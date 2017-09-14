import * as ActionTypes from '../actions/types'

const initialState = {
  communityScore: null,
  communityScoreEventId:'',
  communityAnimation1: true,
  communityAnimation2: false,
  shouldRefetchUserScore: false,
  lastContributor: {id:'', pictureUrl:'' },
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
      lastContributor: {id: action.userId, pictureUrl: action.userPictureUrl}
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
    case ActionTypes.REQUEST_REFETCH_USER_SCORE:
      return {
        ...state, shouldRefetchUserScore: true,
      }
    case ActionTypes.REFETCH_USER_SCORE_COMPLETE:
      return {
        ...state, shouldRefetchUserScore: false,
      }
    default:
      return state
  }
}
