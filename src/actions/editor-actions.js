import * as ActionTypes from './types'

export const handleEditorChange = (html) => ({
  type: ActionTypes.EDITOR_CHANGE,
  html
})

export const setEditorValue = (html) => ({
  type: ActionTypes.SET_EDITOR_VALUE,
  html
})

export const clearEditor = () => ({
  type: ActionTypes.CLEAR_EDITOR,
})
