import * as ActionTypes from '../actions/types'

const initialState = {isCreateViewOpen: false, openUpdateViewId:''}

export default function challengesReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_NOTIFICATIONS_MOBILE:
      return {...state, isNotificationMobileOpen: true}
    case ActionTypes.HIDE_NOTIFICATIONS_MOBILE:
      return {...state, isFilterMobileOpen: false}
    default:
      return state
  }
}
