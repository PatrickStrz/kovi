import {gql} from 'react-apollo'
import {challengeBodyFragment} from '../queries/challenge-queries'

export const deleteChallengeMutation = gql`mutation deleteChallenge($id:ID!){
  deleteChallenge(id:$id){
    id
  }
}`

export const createChallengeAndScoreMutation = gql`mutation
  createChallengeAndScore(
    $description: String,
    $title: String,
    $filter:UserFilter,
    $scorecardId:ID!,
    $scoreValue:Int!
  ){
	  createChallenge(description:$description,title:$title){
    ...challengeBody
    }
    createScore(value:$scoreValue, scorecardId:$scorecardId){
        value
      }
    }
  ${challengeBodyFragment}
`

// export const createChallengeMutation = gql`mutation
//   createChallengeMutation($description: String, $title: String, $filter:UserFilter){
// 	  createChallenge(description:$description,title:$title){
//     ...challengeBody
//     }
//   }
//   ${challengeBodyFragment}
// `

export const updateChallengeMutation = gql`mutation
  updateChallengeMutation($id: ID!, $description: String, $title: String, $filter:UserFilter){
	  updateChallenge(id:$id, description:$description,title:$title){
      ...challengeBody
    }
  }
  ${challengeBodyFragment}
`

export const addChallengeUpvoteMutation = gql`mutation
  addToChallengeUpvotes($userId:ID!,$challengeId:ID!, $filter:UserFilter){
    addToChallengeUpvotes(upvotedChallengesChallengeId: $challengeId,
      upvotesUserId: $userId,){
      upvotedChallengesChallenge{
          ...challengeBody
        }
      }
    }
  ${challengeBodyFragment}
`
export const removeChallengeUpvoteMutation = gql`mutation
  removeFromChallengeUpvotes($userId:ID!,$challengeId:ID!, $filter:UserFilter){
    removeFromChallengeUpvotes(
      upvotedChallengesChallengeId: $challengeId,
      upvotesUserId: $userId,){
      upvotedChallengesChallenge{
          ...challengeBody
        }
      }
    }
  ${challengeBodyFragment}
`
