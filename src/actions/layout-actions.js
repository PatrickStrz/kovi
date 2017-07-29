import * as ActionTypes from './types'

export const hideScreen = (html) => ({
  type: ActionTypes.HIDE_SCREEN,
  html
})

export const showScreen = () => ({
  type: ActionTypes.SHOW_SCREEN,
})
