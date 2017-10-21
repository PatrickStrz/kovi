import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showErrorAlert} from 'actions/alert-actions'
//gql
import {graphql, compose} from 'react-apollo'
import {
  DELETE_COMMENT_MUTATION,
  CREATE_CHILD_COMMENT_MUTATION ,
} from 'gql/Comment/mutations'
//lib + other
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
import {XS_MAX} from 'styles/screen-sizes'
import {logException} from '../config'
import {login} from 'lib/auth'
import {removeValueFromList} from 'lib/array-helpers'
//components
import {
  TextButton,
  InputWithProfile,
  WarningDialog
} from 'ui-kit'

import RaisedButton from 'material-ui/RaisedButton'
import {Comment} from 'ui-kit'

/*
    * Component with comments + childComments + operations (create/delete comments)
    * Completely reusable, can use with any gql Type that is commentable.
*/
class CommentSection extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentCreateMutation: PropTypes.func.isRequired,
    commentTypeId: PropTypes.object.isRequired, //for gql i.e DiscussionId: id
    //redux
    userImageUrl: PropTypes.string,
    apiUserId: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    showErrorAlert: PropTypes.func.isRequired,
    //gql
    refetchQuery: PropTypes.object.isRequired, //gql query
    createChildCommentMutation: PropTypes.func.isRequired,
  }

  state = {
    commentText: '',
    deleteCommentId: '',
    deleteInProgress: false,
    createInProgress: false,
    childCommentsText: {},
    childCommentsAreCreating:[],
    childCommentInputVisibleFor:[], // array of parent comment ids
  }

  //pass in true for childComment parameter if rendering childComment

  /* -------- element rendering functions -------- */

  renderComment = (comment, childComment='') => {
    return(
      <div key={`challenge-comment-${comment.id}`}>
        <Comment
          comment={comment}
          childComment={childComment ? true : false}
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
            <ChildCommentSectionWrapper>
              <ChildCommentSectionBox>
                {this.renderChildComments(comment.childComments)}
              </ChildCommentSectionBox>
              {this.renderReply(comment.id)}
            </ChildCommentSectionWrapper>
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
          onClick={this.handleCommentSubmit}
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

  renderChildCommentCreate = (parentCommentId) => {
    const isCreating = this.state.childCommentsAreCreating.indexOf(parentCommentId) >= 0
    if (this.props.isAuthenticated){
      return(
        <CreateCommentBox>
          <InputWithProfile
            avatarImageUrl={this.props.userImageUrl}
            avatarSize="18px"
            placeholder="write a reply..."
            handleChange={text => this.handleChildCommentInput(text,parentCommentId)}
            value={this.state.childCommentsText[parentCommentId]}
          />
        <TextButton
          label="Post"
          onClick={()=>this.handleChildCommentSubmit(parentCommentId)}
          inProgress={isCreating}
        />
      </CreateCommentBox>
      )
    }

    else {
      const label = "log in to reply"
      const handleClick = () => login()
      return <RaisedButton primary={true} label={label} onClick={handleClick} />
    }
  }

  renderReply = (parentCommentId) => {
    if (this.state.childCommentInputVisibleFor.indexOf(parentCommentId) >= 0) {
      return this.renderChildCommentCreate(parentCommentId)
    }
    else{
      return(
      <div style={{marginLeft:'16px'}}>
        <TextButton
          fontSize="14px"
          withBorder={true}
          borderColor={colors.lightGrey}
          color={colors.medGrey}
          label="reply"
          onClick={()=>this.handleReplyClick(parentCommentId)}
        />
      </div>
      )
    }
  }


  /*---------  handler functions:  ---------*/

  handleCommentInput = (text) => {
    this.setState({commentText:text})
  }

  handleChildCommentInput = (text, id) => {
    const childComment = {}
    childComment[id] = text
    this.setState({
      childCommentsText:{
      ...this.state.childCommentsText,
      ...childComment}
     })
  }

  /* using mutation from parent component ( so can comment
  on any commentable type such as Challenges) : */

  handleCommentSubmit = async () => {
    const {
      apiUserId,
      commentTypeId,
      refetchQuery,
      showErrorAlert,
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
      showErrorAlert("Failed to create comment")
      logException(err, {
      action: "handleCommentCreate function in CommentsContainer"
      })
    }
  }

  handleChildCommentSubmit = async (parentCommentId) => {
    const {
      apiUserId,
      refetchQuery,
      showErrorAlert,
      commentTypeId,
    } = this.props

    const options = {
      variables: {
        parentCommentId,
        userId: apiUserId,
        text: this.state.childCommentsText[parentCommentId],
      },
      refetchQueries: [{
        query: refetchQuery,
        variables: {
          ...commentTypeId
        },
      }],
    }

    try{
      //Create in progress:
      this.setState({
        childCommentsAreCreating:[
          ...this.state.childCommentsAreCreating,
          parentCommentId,
        ], // for loading indicator
      })
      await this.props.createChildCommentMutation(options)
      //create successful
      const childCommentsAreCreating = removeValueFromList(
        parentCommentId,
        this.state.childCommentsAreCreating
      )

      const childCommentsText = {...this.state.childCommentsText}
      childCommentsText[parentCommentId] = ''
      this.setState({
        childCommentsText,
        childCommentsAreCreating,
      }) //clears input
    }

    catch(err){

      const childCommentsAreCreating = removeValueFromList(
        parentCommentId,
        this.state.childCommentsAreCreating
      )

      this.setState({childCommentsAreCreating})

      err && showErrorAlert("Failed to create reply")

      logException(err, {
      action: "handleChildCommentCreate function in CommentsContainer"
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

  handleReplyClick = (parentCommentId) => {
    const {childCommentInputVisibleFor} = this.state
    // if value not in list:
    if (childCommentInputVisibleFor.indexOf(parentCommentId) === -1) {
      this.setState({
        childCommentInputVisibleFor: [
          ...childCommentInputVisibleFor, parentCommentId
        ]
      })
    }
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

// common mutations to all comment sections
const CommentSectionWithMutations = compose(
  graphql(DELETE_COMMENT_MUTATION, {name: 'deleteCommentMutation'}),
  graphql(CREATE_CHILD_COMMENT_MUTATION, {name: 'createChildCommentMutation'}),
)(CommentSection)

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showErrorAlert
  }, dispatch)
}

const mapStateToProps = (state) => ({
  userImageUrl: state.app.auth.profile.picture,
  apiUserId: state.app.auth.apiUserId,
  isAuthenticated: state.app.auth.isAuthenticated,
})

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

const ChildCommentSectionWrapper = styled.div`
  border-left: 4px solid ${colors.faintGrey};
  margin-left: ${commentAvatarSize};
  padding-left: 10px;
  /* to match margin of CommentText p element: */
  margin-bottom: 16px;
`
const ChildCommentSectionBox = styled.div`
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentSectionWithMutations)
