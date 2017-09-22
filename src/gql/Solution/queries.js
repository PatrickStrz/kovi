import {gql} from 'react-apollo'
import {SOLUTION_BODY_FRAGMENT} from './fragments'

export const SOLUTIONS_FOR_CHALLENGE_QUERY = gql`
  query solutionsForChallenge($challengeId:ID){
    allSolutions(filter:{
      challenge:{id:$challengeId}
    }){
      ...solutionBody
    }
  }
  ${SOLUTION_BODY_FRAGMENT}
`
