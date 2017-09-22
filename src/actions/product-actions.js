import * as ActionTypes from './types'
export const showProductSolutionForm = (challengeId) => ({
  type: ActionTypes.SHOW_PRODUCT_SOLUTION_CREATE_VIEW,
  challengeId
})

export const hideProductSolutionForm = () => ({
  type: ActionTypes.HIDE_PRODUCT_SOLUTION_CREATE_VIEW
})
