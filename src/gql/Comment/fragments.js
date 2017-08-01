import {gql} from 'react-apollo'

export const COMMENT_BODY_FRAGMENT = gql`
		fragment commentBody on Comment {
      id
  		text
      user{
        id
        name
        picture
        pictureLarge
      }
	}
`
