import * as ActionTypes from './types'

export const showAlert = (message) => ({
  type: ActionTypes.SHOW_GENERIC_ALERT,
  message
})

export const hideAlert = () => ({
  type: ActionTypes.HIDE_GENERIC_ALERT
})
