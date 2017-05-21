import {gql} from 'react-apollo'

export const userQuery = gql`
  query userQuery{
    user {
      id
    }
  }
`
