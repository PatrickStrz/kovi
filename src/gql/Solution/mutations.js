import {gql} from 'react-apollo'

export const CREATE_PRODUCT_SOLUTION_MUTATION = gql`
  mutation createSolution(
    $challengeId:ID,
    $title: String!,
    $imageId:ID,
    $url:String!
  ){
   	createSolution(
      challengeId:$challengeId,
      product:{
        title:$title
        url: $url
        imageId:$imageId
      }
    ){
      id
      product{
        id
        title
        url
        image{
          id
          url
        }
      }
    }
  }
`
