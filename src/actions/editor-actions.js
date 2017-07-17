import * as ActionTypes from './types'

export const handleEditorChange = (html) => ({
  type: ActionTypes.EDITOR_CHANGE,
  html
})
