import {gql} from 'react-apollo'
import {SOLUTION_BODY_FRAGMENT} from './fragments'
export const CREATE_PRODUCT_SOLUTION_MUTATION = gql`
  mutation createSolution(
    $challengeId:ID,
    $title: String!,
    $imageId:ID,
    $url:String!,
    $authorId:ID
  ){
   	createSolution(
      challengeId:$challengeId,
      authorId:$authorId
      product:{
        title:$title
        url: $url
        imageId:$imageId
      }
    ){
      ...solutionBody
    }
  }
  ${SOLUTION_BODY_FRAGMENT}
`
