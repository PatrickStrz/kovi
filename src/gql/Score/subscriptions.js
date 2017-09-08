import {gql} from 'react-apollo'

export const SCORE_CREATED_SUBSCRIPTION = gql`
  subscription ScoreCreatedSubscription{
    Score(filter:{mutation_in:[CREATED]}){
      node{
        id
        value
      }
    }
  }
`
export const USER_SCORE_CREATED_SUBSCRIPTION = gql`
  subscription userScoreCreatedSubscription($userScorecardId:ID){
    Score(filter:{
      mutation_in:[CREATED],
      node:{
        scorecard:{id:$userScorecardId}
      }
    }){
      node{
        id
        value
        scorecard{
          id
        }
      }
    }
  }
`
