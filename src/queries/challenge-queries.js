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

// export const allChallengesQuery = gql`
// 	query allChallenges($filter: UserFilter, $querySize: Int){
// 		allChallenges(first:$querySize){
// 			...challengeBody
// 		}
//
// 	}
// 	${challengeBodyFragment}
// `

export const allChallengesQuery = gql`
	query allChallenges($filter: UserFilter){
		allChallenges(first:5){
			...challengeBody
		}
		cursor: allChallenges(skip:4, first:1){
    	id
  	}
	}
	${challengeBodyFragment}
`

// example filter:
// {
//   "filter": {"id": "cj2lddgcwoixv01744xswmkk6"}
// }


export const moreChallengesQuery = gql`
	query allChallenges($filter: UserFilter, $cursor: String){
		allChallenges(after:$cursor, first:5){
			...challengeBody
		}
		cursor: allChallenges(after:$cursor, skip:4, first:1){
    	id
  	}
	}
	${challengeBodyFragment}
`
