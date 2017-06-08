import {gql} from 'react-apollo'
import {challengeBodyFragment} from '../queries/challenge-queries'

export const deleteChallengeMutation = gql`mutation deleteChallenge($id:ID!){
  deleteChallenge(id:$id){
    id
  }
}`

export const createChallengeMutation = gql`mutation
  createChallengeMutation($description: String, $title: String, $filter:UserFilter){
	  createChallenge(description:$description,title:$title){
    ...challengeBody
    }
  }
  ${challengeBodyFragment}
`

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
