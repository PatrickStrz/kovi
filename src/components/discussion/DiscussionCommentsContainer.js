//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql, compose} from 'react-apollo'
import {COMMENTS_ON_DISCUSSION_QUERY} from '../gql/Comment/queries'
import {CREATE_COMMENT_ON_DISCUSSION_MUTATION} from 'gql/Comment/mutations'
//helpers+other
import {logException} from '../config'
//components
import GenericError from 'ui-kit/GenericError'
import CommentSection from 'components/CommentSection'

class DiscussionCommentsContainer extends Component{
  static propTypes = {
    challengeId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      allComments: PropTypes.array,
    }).isRequired,
  }

  render(){
    const data = this.props.data // apollo client data
    const {createCommentOnChallengeMutation, discussionId} = this.props

    if (data.loading){
      return(<div>...loading</div>)
    }
    if (data.error){
      logException(data.error, {
        action: "COMMENTS_ON_DISCUSSION_QUERY query in ChallengeCommentsContainer"
      })
      return(
        <GenericError/>
      )
    }
    return(
      <CommentSection
        commentCreateMutation={createCommentOnChallengeMutation}
        comments={data.allComments}
        discussionId={discussionId}
      />
    )
  }
}

const DiscussionCommentsApollo = compose(
  graphql(
    COMMENTS_ON_CHALLENGE_QUERY,{
      options: ({challengeId}) => ({variables: {challengeId}})
    }),
  graphql(CREATE_COMMENT_ON_CHALLENGE_MUTATION, {name: 'createCommentOnChallengeMutation'}),
)(ChallengeCommentsContainer)

export default DiscussionCommentsApollo
