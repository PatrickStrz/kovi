import {gql} from 'react-apollo'
import {CHALLENGE_BODY_FRAGMENT} from './fragments'

export const DELETE_CHALLENGE_MUTATION = gql`mutation deleteChallenge($id: ID!){
  deleteChallenge(id: $id){
    id
  }
}`

export const CREATE_CHALLENGE_AND_SCORE_MUTATION = gql`mutation
  createChallengeAndScore(
    $title: String,
    $body: String,
    $filter: UserFilter,
    $scorecardId: ID!,
    $scoreValue: Int!
    $authorId: ID,
    $imageId: ID,
  ){
	  createChallenge(
      title: $title,
      body: $body,
      authorId: $authorId,
      imageId: $imageId
    ){
    ...challengeBody
    }
    createScore(value:$scoreValue, scorecardId:$scorecardId){
        value
      }
    }
  ${CHALLENGE_BODY_FRAGMENT}
`

// export const CREATE_CHALLENGE_MUTATION = gql`mutation
//   createChallengeMutation($description: String, $title: String, $filter:UserFilter){
// 	  createChallenge(description:$description,title:$title){
//     ...challengeBody
//     }
//   }
//   ${CHALLENGE_BODY_FRAGMENT}
// `

export const UPDATE_CHALLENGE_MUTATION = gql`mutation
  updateChallengeMutation(
    $id: ID!,
    $body: String,
    $title: String,
    $filter: UserFilter
  ){
	  updateChallenge(id: $id, title:$title, body: $body,){
      ...challengeBody
    }
  }
  ${CHALLENGE_BODY_FRAGMENT}
`

export const ADD_CHALLENGE_UPVOTE_MUTATION = gql`mutation
  addToChallengeUpvotes($userId: ID!,$challengeId: ID!, $filter: UserFilter){
    addToChallengeUpvotes(upvotedChallengesChallengeId: $challengeId,
      upvotesUserId: $userId,){
      upvotedChallengesChallenge{
          ...challengeBody
        }
      }
    }
  ${CHALLENGE_BODY_FRAGMENT}
`
export const REMOVE_CHALLENGE_UPVOTE_MUTATION = gql`mutation
  removeFromChallengeUpvotes(
    $userId: ID!,
    $challengeId: ID!,
    $filter: UserFilter
  ){
    removeFromChallengeUpvotes(
      upvotedChallengesChallengeId: $challengeId,
      upvotesUserId: $userId,){
      upvotedChallengesChallenge{
          ...challengeBody
        }
      }
    }
  ${CHALLENGE_BODY_FRAGMENT}
`
