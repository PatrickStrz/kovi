import * as ActionTypes from './types'

export const showDiscussionView = (discussionId) => ({
  type: ActionTypes.SHOW_DISCUSSION_VIEW,
  id: discussionId
})

export const hideDiscussionView = () => ({
  type: ActionTypes.HIDE_DISCUSSION_VIEW,
})
