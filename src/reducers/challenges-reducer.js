import * as ActionTypes from '../actions/types'

const initialState = {
  isCreateViewOpen: false,
  openUpdateViewId:'',
  newUserChallenges:[]
}

export default function challengesReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_CREATE_CHALLENGE_VIEW:
      return {...state, isCreateViewOpen: true}
    case ActionTypes.HIDE_CREATE_CHALLENGE_VIEW:
      return {...state, isCreateViewOpen: false}
    case ActionTypes.SHOW_UPDATE_CHALLENGE_VIEW:
      return {...state, openUpdateViewId: action.id}
    case ActionTypes.HIDE_UPDATE_CHALLENGE_VIEW:
      return {...state, openUpdateViewId:''}
    case ActionTypes.SHOW_CHALLENGE_DETAIL_VIEW:
      return {...state, openChallengeDetailViewId: action.id}
    case ActionTypes.HIDE_CHALLENGE_DETAIL_VIEW:
      return {...state, openChallengeDetailViewId:''}
    case ActionTypes.CHALLENGE_CREATED:
      return {
        ...state,
        newUserChallenges:[...state.newUserChallenges, action.id],
      }
    default:
      return state
  }
}
