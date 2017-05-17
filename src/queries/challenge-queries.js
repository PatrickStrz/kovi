import {gql} from 'react-apollo'

// export const allChallengesQuery = gql`query allChallenges {
// 	allChallenges{
//     id
//     title
//     description
//   }
// }`
// const filter = {
// 	{"auth0UserId": "facebook|10154990636666251"}
// }

export const allChallengesQuery = gql`query allChallenges($Likesfilter: UserFilter){
	allChallenges{
    id
    title
    description
    _upvotesMeta{
      count
    }
    upvotes(filter: $Likesfilter){
      auth0UserId
    }
  }
}`

// query getLikedPosts($filter: UserFilter,){
//   Challenge(id:"cj2mkokjpszd10167l8cgq5yr"){
//     upvotes(filter:$filter){
//       auth0UserId,
//       id
//     }
//     _upvotesMeta{
//       count
//     }
//   }
// }
//
// {
//   "filter": {"id_not_in": "cj2lddgcwoixv01744xswmkk6"}
// }
