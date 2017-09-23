import {gql} from 'react-apollo'

export const ACTIVE_COMPETITIONS_QUERY = gql`
  query activeCompetitionList{
    allCompetitions(filter:{active:true}){
      id
      description
    }
  }
`
