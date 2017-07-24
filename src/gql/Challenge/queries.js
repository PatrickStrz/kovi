import {gql} from 'react-apollo'
import {CHALLENGE_BODY_FRAGMENT} from './fragments'
// use filter 'id' for didUserUpvote, returns empty array if user didn't upvote

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

export const CHALLENGE_DETAIL_QUERY = gql`
	query Challenge($id:ID!){
		Challenge(id:$id){
			id
			title
			description
			body
			author{
				id
				picture
			}
		}
	}
`

export const ALL_CHALLENGES = gql`
	query {
		allChallenges{
			id
			title
		}
	}
`
