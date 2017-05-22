import {gql} from 'react-apollo'

// use filter 'id' for didUserUpvote, returns empty array if user didn't upvote
export const allChallengesQuery = gql`
	query allChallenges($filter: UserFilter,){
		allChallenges{
			id
			title
			description
			userDidUpvote: upvotes(filter:$filter){
				id
			}
			upvotes{
				name
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
