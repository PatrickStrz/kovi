import {gql} from 'react-apollo'

export const USER_SCORECARD_QUERY = gql`
  query userScorecard($id:ID){
    Scorecard(id:$id){
      total
    }
  }
`
