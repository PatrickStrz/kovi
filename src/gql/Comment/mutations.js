import {gql} from 'react-apollo'
import {COMMENT_BODY_FRAGMENT} from './fragments'

export const CREATE_CHILD_COMMENT_MUTATION = gql`
  mutation createChildComment(
    $parentCommentId: ID,
    $userId: ID,
    $text: String
  ){
    createComment(
      parentCommentId: $parentCommentId,
      userId: $userId
      text: $text){
      id
    }
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($commentId:ID!){
    deleteComment(id:$commentId){
      id
    }
  }
`

export const CREATE_COMMENT_ON_CHALLENGE_MUTATION = gql`
  mutation createComment($challengeId: ID, $userId: ID, $text: String){
    createComment(
      challengeId: $challengeId,
      userId: $userId
      text: $text){
      ...commentBody
    }
  }
  ${COMMENT_BODY_FRAGMENT}
`
