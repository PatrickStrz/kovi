//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql, compose} from 'react-apollo'
import {COMMENTS_ON_DISCUSSION_QUERY} from 'gql/Comment/queries'
import {CREATE_COMMENT_ON_DISCUSSION_MUTATION} from 'gql/Comment/mutations'
//helpers+other
import {logException} from 'config'
//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'
import CommentSection from 'components/CommentSection'

class DiscussionCommentsContainer extends Component{
  static propTypes = {
    discussionId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      allComments: PropTypes.array,
    }).isRequired, // apollo
    createCommentOnDiscussionMutation: PropTypes.func.isRequired, // apollo
  }

  render(){
    const data = this.props.data // apollo client data
    const {createCommentOnDiscussionMutation, discussionId} = this.props

    if (data.loading){
      return(<GenericLoader text="..."/>)
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
        commentCreateMutation={createCommentOnDiscussionMutation}
        refetchQuery={COMMENTS_ON_DISCUSSION_QUERY}
        comments={data.allComments}
        commentTypeId={{discussionId}}
      />
    )
  }
}

const DiscussionCommentsApollo = compose(
  graphql(
    COMMENTS_ON_DISCUSSION_QUERY,{
      options: ({discussionId}) => ({variables: {discussionId}})
    }),
  graphql(CREATE_COMMENT_ON_DISCUSSION_MUTATION, {name: 'createCommentOnDiscussionMutation'}),
)(DiscussionCommentsContainer)

export default DiscussionCommentsApollo
