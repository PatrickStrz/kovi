import {gql} from 'react-apollo'

export const gql`
  mutation createCompetitionEntry (
    $competitionId:ID!,
    $authorId:ID!,
    $html:String!
  ){
  createEntry(
    competitionId:$competitionId,
    authorId:$authorId,
    html:$html
  ){
    id
    html
  }
}
`
