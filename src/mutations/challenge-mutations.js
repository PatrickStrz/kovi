import {gql} from 'react-apollo'

export const deleteChallengeMutation = gql`mutation deleteChallenge($id:ID!){
  deleteChallenge(id:$id){
    id
  }
}`
