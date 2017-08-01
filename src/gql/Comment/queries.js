import {gql} from 'react-apollo'
import {COMMENT_BODY_FRAGMENT} from './fragments'

export const COMMENTS_ON_CHALLENGE = gql`
  query commentsForChallenge($challengeId:ID){
    allComments(first:15,filter:{challenge:{id:$challengeId}}){
      ...commentBody
      childComments{
        ...commentBody
      }
    }
  }
  ${COMMENT_BODY_FRAGMENT}
`
