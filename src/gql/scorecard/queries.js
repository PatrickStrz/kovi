import {gql} from 'react-apollo'

export const userScoreCardQuery = gql`
  query Scorecard($id:ID){
    Scorecard(id:$id){
      total
    }
  }
`
