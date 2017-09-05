import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
//other
import {requireAuth} from 'lib/auth'
import {colors} from 'styles/theme/colors'
import {logException} from '../config'
//components
import Popover from 'ui-kit/Popover'
import ProfileCardContainer from 'components/ProfileCardContainer'
import UserHeader from 'ui-kit/UserHeader'
import DeleteWithAlert from 'ui-kit/icons'

const CommentBox = styled.div`
  padding: 15px;
  border-radius: 3px;
  ${ props => props.willDelete && css`
    background-color: ${colors.errorRed}
    ` }
`

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const CommentText = styled.p`
  color: #545252;
  word-wrap: break-word;
`

// Component that consists of user avatar with user name beside
class Comment extends Component{

  static propTypes = {
    comment: PropTypes.object.isRequired,
    subcomment: PropTypes.bool,
    onDeleteClick: PropTypes.bool,
    // apiUserId = PropTypes.string.isRequired,
  }

  handleDeleteComment = async (commentId) => {
    const {deleteCommentMutation, commentTypeId, refetchQuery} = this.props
    const options = {
      variables: {commentId},
      refetchQueries: [{
        query: refetchQuery,
        variables: {...commentTypeId},
      }],
    }
    try{
      this.setState({deleteInProgress:true})
      await deleteCommentMutation(options)
      //clear input, close delete modal
      this.setState({
        commentText: '',
        deleteCommentId: '',
        deleteInProgress:false
      })
    }
    catch(err){
      logException(err, {
      action: "handleCommentDelete function in CommentsContainer"
      })
      //stop deleteProgress
      this.setState({deleteInProgress:false})
    }
  }

  renderDelete = (commentAuthorId, commentId) => {
    const {apiUserId, comment} = this.props
    if (apiUserId === commentAuthorId ){
      return(
        <FaIconButton
          onClick={()=>requireAuth(
            ()=> this.setState({deleteCommentId: comment.id})
          )}
          color={colors.lightGrey}
          hoverColor={colors.errorRed}
          faClassName="fa-trash"
        />
        <DeleteWithAlert apiUserId={}/>
      )
    }
    else{
      return
    }
  }

  render(){
    const commentAvatarSize = '35px'
    const childCommentAvatarSize = '25px'

    const {comment, subcomment} = this.props

    return(
      <CommentBox
        // willDelete={this.state.deleteCommentId === comment.id}
        key={'comment' + comment.id}>
        <CommentHeader>
          <Popover
            renderedInDialog={true}
            body={<ProfileCardContainer userId={comment.user.id} />}
          >
            <UserHeader
              imageUrl={comment.user.picture}
              userName={comment.user.name}
              avatarSize={subcomment ? childCommentAvatarSize : commentAvatarSize}
            />
          </Popover>
          {/* {this.renderDelete(comment.user.id, comment.id)} */}
        </CommentHeader>
        <CommentText>{comment.text}</CommentText>
      </CommentBox>
    )
  }
}

const CommentWithMutation = graphql(
  DELETE_COMMENT_MUTATION, {name: 'deleteCommentMutation'}
)(CommentSection)

export default Comment
