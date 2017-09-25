import {gql} from 'react-apollo'
import {ENTRY_BODY_FRAGMENT} from 'gql/Entry/fragments'

export const ACTIVE_COMPETITIONS_QUERY = gql`
  query activeCompetitionList{
    allCompetitions(filter:{active:true}){
      id
      description
    }
  }
`
export const COMPETITION_DETAIL_QUERY = gql`
  query CompetitionDetail($id:ID!){
    Competition(id:$id){
      id
      description
      entries{
        ...entryBody
      }
    }
  }
  ${ENTRY_BODY_FRAGMENT}
`
