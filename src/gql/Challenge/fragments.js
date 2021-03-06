import {gql} from 'react-apollo'

export const CHALLENGE_BODY_FRAGMENT = gql`
		fragment challengeBody on Challenge {
			id
			title
			description
			body
			image{
				id
				url
			}
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
