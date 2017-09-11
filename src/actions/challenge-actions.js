import * as ActionTypes from './types'

export const showCreateChallengeView = () => ({
  type: ActionTypes.SHOW_CREATE_CHALLENGE_VIEW
})

export const hideCreateChallengeView = () => ({
  type: ActionTypes.HIDE_CREATE_CHALLENGE_VIEW
})

export const showUpdateChallengeView = (id) => ({
  type: ActionTypes.SHOW_UPDATE_CHALLENGE_VIEW,
  id
})

export const hideUpdateChallengeView = () => ({
  type: ActionTypes.HIDE_UPDATE_CHALLENGE_VIEW
})

export const challengeCreated = (id) => ({
  type: ActionTypes.CHALLENGE_CREATED,
  id
})
