import {gql} from 'react-apollo'

// JWT token provided in header via middleware.
//Graphcool API returns a user in response to token
export const USER_QUERY = gql`
  query userQuery{
    user {
      id
    }
  }
`
