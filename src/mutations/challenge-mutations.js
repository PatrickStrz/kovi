import {gql} from 'react-apollo'

export const deleteChallengeMutation = gql`mutation deleteChallenge($id:ID!){
  deleteChallenge(id:$id){
    id
  }
}`

export const createChallengeMutation = gql`mutation
  createChallengeMutation($description: String, $title: String){
	  createChallenge(description:$description,title:$title){
    id
  }
}`
