import {gql} from 'react-apollo'

export const SOLUTION_BODY_FRAGMENT = gql`
	fragment solutionBody on Solution {
    id
    author{
      id
      name
      picture
    }
    product{
      id
      title
      url
      image{
        id
        url
      }
    }
	}
`
