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

export const updateChallengeMutation = gql`mutation
  updateChallengeMutation($id: ID!, $description: String, $title: String){
	  updateChallenge(id:$id, description:$description,title:$title){
    id
  }
}`
