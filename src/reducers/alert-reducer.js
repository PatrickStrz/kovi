import * as ActionTypes from 'actions/types'

const initialState = {
  message: ''
}

export default function alertReducer(state=initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_GENERIC_ALERT:
      return {...state, message: action.message}
    case ActionTypes.HIDE_GENERIC_ALERT:
      return {...state, message: ''}
    default:
      return state
  }
}
