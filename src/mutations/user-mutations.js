import {gql} from 'react-apollo'

export const userPayloadFragment = gql`
		fragment userPayload on User {
			id
      scorecard{
        id
      }
	}
`

export const updateUserMutation = gql`
  mutation updateUser(
    $id: ID!,
    $email: String,
    $familyName: String,
    $givenName: String,
    $name: String,
    $picture: String,
    $pictureLarge: String
  ){
    updateUser(
      id: $id,
      email: $email,
      familyName: $familyName,
      givenName: $givenName,
      name: $name,
      picture: $picture,
      pictureLarge: $pictureLarge
    ){
      ...userPayload
    }
  }
  ${userPayloadFragment}
`
export const createUserMutation = gql`
  mutation createUser(
    $idToken: String!,
    $email: String,
    $familyName: String,
    $givenName: String,
    $name: String,
    $picture: String,
    $pictureLarge: String
  ){
    createUser(
      authProvider: {auth0: {idToken: $idToken}},
      email: $email,
      familyName: $familyName,
      givenName: $givenName,
      name: $name,
      picture: $picture,
      pictureLarge: $pictureLarge,
      scorecard:{
        total:0,
        communityAggregateId:"cj4g4c9rr4mt80161rbf48gfd",
      }
    ){
      ...userPayload
    }
  }
  ${userPayloadFragment}
`
