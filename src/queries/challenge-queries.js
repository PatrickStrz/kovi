import {gql} from 'react-apollo'

// use filter 'id' for didUserUpvote, returns empty array if user didn't upvote
// export const allChallengesQuery = gql`
// 	query allChallenges($filter: UserFilter,){
// 		allChallenges{
// 			id
// 			title
// 			description
// 			userDidUpvote: upvotes(filter:$filter){
// 				id
// 			}
// 			upvotes{
// 				id
// 			}
// 			_upvotesMeta{
// 				count
// 			}
// 		}
// 	}
// `

export const allChallengesQuery = gql`
	query allChallenges($filter: UserFilter, $querySize: Int){
		allChallenges(first:$querySize){
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
	}
`

export const moreChallengesQuery = gql`
	query allChallenges($filter: UserFilter, $cursor: String, $querySize: Int){
		allChallenges(after:$cursor, first:$querySize){
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
	}
`
// example filter:
// {
//   "filter": {"id": "cj2lddgcwoixv01744xswmkk6"}
// }
