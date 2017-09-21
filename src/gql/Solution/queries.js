import {gql} from 'react-apollo'

export const SOLUTIONS_FOR_CHALLENGE_QUERY = gql`
  query solutionsForChallenge($challengeId:ID){
    allSolutions(filter:{
      challenge:{id:$challengeId}
    }){
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
