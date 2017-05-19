import {gql} from 'react-apollo'

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
        id
        name
        email
      }
  }
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
      pictureLarge: $pictureLarge
    ){
        id
        name
        email
      }
  }
`
