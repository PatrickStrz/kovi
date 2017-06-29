import {gql} from 'react-apollo'

// JWT token provided in header via middleware.
//Graphcool API returns a user in response to token
export const userQuery = gql`
  query userQuery{
    user {
      id
    }
  }
`
