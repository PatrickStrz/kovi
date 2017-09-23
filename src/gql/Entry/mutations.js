import {gql} from 'react-apollo'

export const gql`
  mutation createCompetitionEntry (
    $competitionId:ID!,
    $authorId:ID!,
    $entry:String!
  ){
    createEntry(
      competitionId:$competitionId,
      authorId:$authorId,
      entry:$entry
    ){
      id
      entry
    }
  }
`
