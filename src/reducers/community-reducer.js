import * as ActionTypes from 'actions/types'

const initialState = {openDiscusionId:'', shouldRefetchLeaderboard: false}

export default function(state=initialState, action){
  switch (action.type) {
    case ActionTypes.SHOW_DISCUSSION_VIEW:
      return {...state, openDiscusionId: action.id }
    case ActionTypes.HIDE_DISCUSSION_VIEW:
      return {...state, openDiscusionId: '' }
    case ActionTypes.REQUEST_REFETCH_LEADERBOARD:
      return {...state, shouldRefetchLeaderboard: true }
    case ActionTypes.REFETCH_LEADERBOARD_COMPLETE:
      return {...state, shouldRefetchLeaderboard: false}
    default:
      return state
  }
}
