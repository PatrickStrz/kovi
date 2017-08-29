import {gql} from 'react-apollo'
// JWT token provided in header via middleware.
//Graphcool API returns a user in response to token
export const CURRENT_USER_QUERY = gql`
  query userQuery{
    user {
      id
    }
  }
`
export const USER_QUERY = gql`
  query user($id:ID){
    User(id:$id){
      name
      pictureLarge
      scorecard{
        total
      }
    }
  }
`
