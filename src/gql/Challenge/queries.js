import {gql} from 'react-apollo'
import {CHALLENGE_BODY_FRAGMENT} from './fragments'
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
// example filter:
// {
//   "filter": {"id": "cj2lddgcwoixv01744xswmkk6"}
// }


export const ALL_CHALLENGES_QUERY = gql`
	query allChallenges($filter: UserFilter){
		allChallenges(first:5){
			...challengeBody
		}
		cursor: allChallenges(skip:4, first:1){
    	id
  	}
	}
	${CHALLENGE_BODY_FRAGMENT}
`

export const MORE_CHALLENGES_QUERY = gql`
	query allChallenges($filter: UserFilter, $cursor: String){
		allChallenges(after:$cursor, first:5){
			...challengeBody
		}
		cursor: allChallenges(after:$cursor, skip:4, first:1){
    	id
  	}
	}
	${CHALLENGE_BODY_FRAGMENT}
`
