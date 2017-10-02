import {gql} from 'react-apollo'

export const ENTRY_BODY_FRAGMENT = gql`
	fragment entryBody on Entry {
    id
    html
    author{
      id
      name
      picture
    }
	}
`
