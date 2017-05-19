import {gql} from 'react-apollo'

export const userUpdateMutation = gql`
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
