import * as ActionTypes from './types'

export const initializeCommunityScore = (value) => ({
  type: ActionTypes.INITIAL_COMMUNITY_SCORE,
  value
})
export const updateCommunityScore = (value) => ({
  type: ActionTypes.NEW_COMMUNITY_SCORE,
  value
})
