import * as ActionTypes from '../actions/types'

const initialState = {
  isFilterMobileOpen: false,
  isNotificationMobileOpen: false,
  isCommunityMobileOpen: false,
}

export default function bottombarReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_FILTER_MOBILE:
    //Can't have 2 views open at once so clear other views:
      return {
        isFilterMobileOpen: true,
        isNotificationMobileOpen: false,
        isCommunityMobileOpen: false,
      }

    case ActionTypes.HIDE_FILTER_MOBILE:
      return {...state, isFilterMobileOpen: false}

    case ActionTypes.SHOW_NOTIFICATIONS_MOBILE:
      return {
        isFilterMobileOpen: false,
        isNotificationMobileOpen: true,
        isCommunityMobileOpen: false,
      }

    case ActionTypes.HIDE_NOTIFICATIONS_MOBILE:
      return {...state, isNotificationMobileOpen: false}

    case ActionTypes.SHOW_COMMUNITY_MOBILE:
      return {
        isFilterMobileOpen: false,
        isNotificationMobileOpen: false,
        isCommunityMobileOpen: true,
      }

    case ActionTypes.HIDE_COMMUNITY_MOBILE:
      return {...state, isCommunityMobileOpen: false}

    default:
      return state
  }
}
