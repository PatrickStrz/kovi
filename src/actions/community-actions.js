import * as ActionTypes from './types'

export const showDiscussionView = (discussionId) => ({
  type: ActionTypes.SHOW_DISCUSSION_VIEW,
  id: discussionId
})

export const hideDiscussionView = () => ({
  type: ActionTypes.HIDE_DISCUSSION_VIEW,
})

export const requestRefetchLeaderboard = () => ({
  type: ActionTypes.REQUEST_REFETCH_LEADERBOARD,
})

export const refetchLeaderboardComplete = () => ({
  type: ActionTypes.REFETCH_LEADERBOARD_COMPLETE,
})
