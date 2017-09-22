import * as ActionTypes from '../actions/types'

const initialState = {productSolutionFormFor:'',} // challengeId

export default function productReducer(state=initialState, action){
  switch (action.type) {
  case ActionTypes.SHOW_PRODUCT_SOLUTION_CREATE_VIEW:
    return { ...state, productSolutionFormFor: action.challengeId }
  case ActionTypes.HIDE_PRODUCT_SOLUTION_CREATE_VIEW:
    return { ...state, productSolutionFormFor: '' }
  default:
    return state
  }
}
