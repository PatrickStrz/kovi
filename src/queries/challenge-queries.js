import {gql} from 'react-apollo'

// use filter 'id' for didUserUpvote, returns empty array if user didn't upvote

export const challengeBodyFragment = gql`
		fragment challengeBody on Challenge {
			id
			title
			description
			userDidUpvote: upvotes(filter:$filter){
				id
			}
			upvotes{
				id
			}
			_upvotesMeta{
				count
			}
	}
`

export const allChallengesQuery = gql`
	query allChallenges($filter: UserFilter, $querySize: Int){
		allChallenges(first:$querySize){
			...challengeBody
		}
	}
	${challengeBodyFragment}
`

// example filter:
// {
//   "filter": {"id": "cj2lddgcwoixv01744xswmkk6"}
// }


export const moreChallengesQuery = gql`
	query allChallenges($filter: UserFilter, $cursor: String, $querySize: Int){
		allChallenges(after:$cursor, first:$querySize){
			...challengeBody
		}
	}
	${challengeBodyFragment}
`
