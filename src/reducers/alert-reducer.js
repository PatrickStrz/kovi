import * as ActionTypes from 'actions/types'

const initialState = {
  message: '', type: ''
}

export default function alertReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_GENERIC_ALERT:
      return {...state, message: action.message, type: 'generic'}
    case ActionTypes.SHOW_ERROR_ALERT:
      return {...state, message: action.message, type: 'error'}
    case ActionTypes.HIDE_ALERT:
      return {...state, message: '', type: ''}
    default:
      return state
  }
}
