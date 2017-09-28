import {gql} from 'react-apollo'

export const TOP_SCORERS_QUERY = gql`
  query{
    allScorecards(first:5, orderBy:total_DESC){
      id
      total
      user{
        id
        name
        picture
      }
    }
  }
`
