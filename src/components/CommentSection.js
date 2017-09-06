import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showAlert} from 'actions/alert-actions'
//gql
import {graphql, compose} from 'react-apollo'
import {DELETE_COMMENT_MUTATION} from 'gql/Comment/mutations'
//lib + other
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
import {XS_MAX} from 'styles/screen-sizes'
import {logException} from '../config'
import {login} from 'lib/auth'
//components
import InputWithProfile from 'ui-kit/InputWithProfile'
import TextButton from 'ui-kit/TextButton'
import WarningDialog from 'ui-kit/WarningDialog'
import RaisedButton from 'material-ui/RaisedButton'
import {Comment} from 'ui-kit'

const commentAvatarSize = '35px'

const CommentSectionBox = styled.div`
  margin: auto;
  margin-top: 21px;
  justify-content: center;
  width: 90%;
  margin-bottom: 30px;
`
const CommentCreateBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

const SubCommentSectionWrapper = styled.div`
  border-left: 4px solid ${colors.faintGrey};
  margin-left: ${commentAvatarSize};
  padding-left: 10px;
  /* to match margin of CommentText p element: */
  margin-bottom: 16px;
`
const SubCommentSectionBox = styled.div`
  display: flex;
  flex-direction: column;
`

const CreateCommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 70%;
  @media (max-width: ${XS_MAX}) {
    width: 90%
  }
`

const CommentsBox = styled.div`
  /* horizonally center: */
  border-radius: 5px;
  background-color: ${colors.whiteGrey};
  padding: 15px;
`

/*
    * Component with comments + subcomments + operations (create/delete comments)
    * Completely reusable, can use with any gql Type that is commentable.
*/
class CommentSection extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentCreateMutation: PropTypes.func.isRequired,
    commentTypeId: PropTypes.object.isRequired, //for gql i.e DiscussionId: id
    refetchQuery: PropTypes.object.isRequired, //gql query
    //redux
    userImageUrl: PropTypes.string,
    apiUserId: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    showAlert: PropTypes.func.isRequired,
  }

  state = {
    commentText: '',
    deleteCommentId: '',
    deleteInProgress: false,
    createInProgress: false,
  }

  //pass in true for subcomment parameter if rendering subcomment
  renderComment = (comment, subcomment='') => {
    return(
      <div key={`challenge-comment-${comment.id}`}>
        <Comment
          comment={comment}
          subcomment={comment ? true : false}
          onDeleteClick={this.handleDeleteClick}
          apiUserId={this.props.apiUserId}
        />
      </div>
    )
  }

  renderChildComments = (comments) => {
    return(comments.map( comment =>{
        return(this.renderComment(comment, 'subcomment'))
        }
      )
    )
  }

  renderComments = (comments) => {
    return (comments.map(comment =>{
      return(
          <div key={'comment' + comment.id}>
            {this.renderComment(comment)}
            <SubCommentSectionWrapper>
              <SubCommentSectionBox>
                {this.renderChildComments(comment.childComments)}
              </SubCommentSectionBox>
            </SubCommentSectionWrapper>
          </div>
          )
        }
      )
    )
  }

  renderCommentCreate = () => {

    if (this.props.isAuthenticated){
      return(
        <CreateCommentBox>
          <InputWithProfile
            avatarImageUrl={this.props.userImageUrl}
            avatarSize="25px"
            placeholder="write a comment"
            handleChange={text => this.handleCommentInput(text)}
            value={this.state.commentText}
          />
        <TextButton
          label="Post"
          onClick={() => this.handleCommentSubmit()}
          inProgress={this.state.createInProgress}
        />
      </CreateCommentBox>
      )
    }

    else {
      const label = "log in to write a comment"
      const handleClick = () => login()
      return <RaisedButton primary={true} label={label} onClick={handleClick} />
    }
  }

  // handler functions:

  handleCommentInput = (text) => {
    this.setState({commentText:text})
  }

  handleCommentSubmit = async () => {
    const {
      apiUserId,
      commentTypeId,
      refetchQuery,
      showAlert,
    } = this.props

    const options = {
      variables: {
        ...commentTypeId,
        userId: apiUserId,
        text: this.state.commentText,
      },
      refetchQueries: [{
        query: refetchQuery,
        variables: {
          ...commentTypeId
        },
      }],
    }
    try{
      this.setState({createInProgress:true})
      await this.props.commentCreateMutation(options)
      this.setState({commentText:'', createInProgress:false}) //clears input
    }
    catch(err){
      this.setState({createInProgress:false})
      showAlert("Failed to create comment")
      logException(err, {
      action: "handleCommentCreate function in CommentsContainer"
      })
    }
  }
  /* Delete  comments */

  //gql operation
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

  handleDeleteClick = (commentId) => {
    this.setState({deleteCommentId: commentId})
  }

  handleDeleteCb = () => {
    this.handleDeleteComment(this.state.deleteCommentId)
  }

  render(){

    /*--------------- render return -----------------*/

    return(
      <div>
        <CommentSectionBox>
          <CommentsBox>
            {this.renderComments(this.props.comments)}
          </CommentsBox>
          <CommentCreateBox>
            {this.renderCommentCreate()}
          </CommentCreateBox>
        </CommentSectionBox>
        <WarningDialog
          isOpen={this.state.deleteCommentId ? true : false}
          handleClose={()=> this.setState({deleteCommentId: ''})}
          handleCompleteAction={this.handleDeleteCb}
          actionInProgress={this.state.deleteInProgress}
          title="Delete Comment"
          description="are you sure you want to delete this comment?"
          actionName="Delete"
        />
      </div>
    )
  }
}

const CommentSectionWithMutations = compose(
  graphql(DELETE_COMMENT_MUTATION, {name: 'deleteCommentMutation'}),
)(CommentSection)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showAlert
  }, dispatch)
}

const mapStateToProps = (state) => ({
  userImageUrl: state.app.auth.profile.picture,
  apiUserId: state.app.auth.apiUserId,
  isAuthenticated: state.app.auth.isAuthenticated,
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentSectionWithMutations)
