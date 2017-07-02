import {gql} from 'react-apollo'

export const userScoreCardQuery = gql`
  query userScorecard($id:ID){
    Scorecard(id:$id){
      total
    }
  }
`
