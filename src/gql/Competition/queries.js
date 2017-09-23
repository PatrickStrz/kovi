import {gql} from 'react-apollo'

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
        id
        html
        author{
          id
          name
          picture
        }
      }
    }
  }
`
