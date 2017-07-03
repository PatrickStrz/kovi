import {gql} from 'react-apollo'

export const UPDATE_USER_SCORECARD_SUBSCRIPTION = gql`
  subscription updateUserScorecard($id:ID){
    Scorecard(filter:{
      mutation_in:[UPDATED],
      node:{id:$id}
    }){
      mutation
      node{
        total
      }
    }
  }
`
