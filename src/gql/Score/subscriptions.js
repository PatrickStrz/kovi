import {gql} from 'react-apollo'

export const SCORE_CREATED_SUBSCRIPTION = gql`
  subscription ScoreCreatedSubscription{
    Score(filter:{mutation_in:[CREATED]}){
    	mutation
      node{
        value
      }
    }
  }
`
