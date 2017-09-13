import * as ActionTypes from './types'

export const initializeCommunityScore = (value) => ({
  type: ActionTypes.INITIAL_COMMUNITY_SCORE,
  value
})
export const updateCommunityScore = (value, scoreId, userId, userPictureUrl) =>{
  return({
    type: ActionTypes.NEW_COMMUNITY_SCORE,
    value,
    scoreId,
    userId,
    userPictureUrl,
  })

}

export const requestRefetchUserScore = () => ({
  type: ActionTypes.REQUEST_REFETCH_USER_SCORE,
})

export const refetchUserScoreComplete = () => ({
  type: ActionTypes.REFETCH_USER_SCORE_COMPLETE,
})
