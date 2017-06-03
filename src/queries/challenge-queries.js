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

export const nextChallengesQuery = gql`
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






///////////////////////////////////////////////////

const MoreCommentsQuery = gql`
  query MoreComments($cursor: String) {
    moreComments(cursor: $cursor) {
      cursor
      comments {
        author
        text
      }
    }
  }
`;



// add cursor to props
//add filter to props

// const CommentsWithData = graphql(Comment, {
//   // This function re-runs every time `data` changes, including after `updateQuery`,
//   // meaning our loadMoreEntries function will always have the right cursor
//   props({ data: { loading, cursor, comments, fetchMore } }) {
//     return {
//       loading,
//       comments,
//       loadMoreEntries: () => {
//         return fetchMore({
//           query: MoreCommentsQuery,
//           variables: {
//             cursor: cursor,
//           },
//           updateQuery: (previousResult, { fetchMoreResult }) => {
//             const previousEntry = previousResult.entry;
//             const newComments = fetchMoreResult.moreComments.comments;
//             return {
//               // By returning `cursor` here, we update the `loadMore` function
//               // to the new cursor.
//               cursor: fetchMoreResult.cursor,
//               entry: {
//                 // Put the new comments in the front of the list
//                 comments: [...newComments, ...previousEntry.entry.comments],
//               },
//             };
//           },
//         });
//       },
//     };
//   },
// })(Feed);
