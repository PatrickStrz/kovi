import {gql} from 'react-apollo'
import {COMMENT_BODY_FRAGMENT} from './fragments'

export const COMMENTS_ON_CHALLENGE_QUERY = gql`
  query commentsForChallenge($challengeId:ID){
    allComments(filter:{challenge:{id:$challengeId}}){
      ...commentBody
      childComments{
        ...commentBody
      }
    }
  }
  ${COMMENT_BODY_FRAGMENT}
`

export const COMMENTS_ON_DISCUSSION_QUERY = gql`
  query commentsForDiscussion($discussionId:ID){
    allComments(filter:{discussion:{id:$discussionId}}){
      ...commentBody
      childComments{
        ...commentBody
      }
    }
  }
  ${COMMENT_BODY_FRAGMENT}
`
