import {gql} from 'react-apollo'

export const USER_PAYLOAD_FRAGMENT = gql`
		fragment userPayload on User {
			id
      scorecard{
        id
      }
	}
`
