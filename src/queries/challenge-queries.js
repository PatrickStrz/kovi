import {gql} from 'react-apollo'

export const allChallengesQuery = gql`query allChallenges {
	allChallenges{
    id
    title
    description
  }
}`
