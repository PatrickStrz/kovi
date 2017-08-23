import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//gql
import {COMMENTS_ON_CHALLENGE_QUERY} from '../gql/Comment/queries'
import {graphql, compose} from 'react-apollo'
import {DELETE_COMMENT_MUTATION} from 'gql/Comment/mutations'
//lib + other
import styled, {css} from 'styled-components'
import {colors} from 'styles/theme/colors'
import {XS_MAX} from 'styles/screen-sizes'
import {logException} from '../config'
import {login, requireAuth} from 'lib/auth'
//components
import UserHeader from 'ui-kit/UserHeader'
import InputWithProfile from 'ui-kit/InputWithProfile'
import TextButton from 'ui-kit/TextButton'
import FaTrash from 'ui-kit/icons/FaTrash'
import WarningDialog from 'ui-kit/WarningDialog'
import RaisedButton from 'material-ui/RaisedButton'

const commentAvatarSize = '35px'
const childCommentAvatarSize = '25px'

const CommentText = styled.p`
  color: #545252;
  word-wrap: break-word;
`
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

const CommentsBox = styled.div`
  /* horizonally center: */
  border-radius: 5px;
  background-color: ${colors.whiteGrey};
  padding: 15px;
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

const CreateCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 70%;
  @media (max-width: ${XS_MAX}) {
    width: 90%
  }
`

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

class CommentSection extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentCreateMutation: PropTypes.func.isRequired,
    challengeId: PropTypes.string.isRequired,
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
      <CommentBox
        willDelete={this.state.deleteCommentId === comment.id}
        key={'comment' + comment.id}>
        <CommentHeader>
          <UserHeader
            imageUrl={comment.user.picture}
            userName={comment.user.name}
            avatarSize={subcomment ? childCommentAvatarSize : commentAvatarSize}
          />
          <FaTrash
            handleClick={()=>requireAuth(
              ()=> this.setState({deleteCommentId: comment.id})
            )}>
          </FaTrash>
        </CommentHeader>
        <CommentText>{comment.text}</CommentText>
      </CommentBox>
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
        <CreateCommentContainer>
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
        </CreateCommentContainer>
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
    /* todo make conditional options based on what Type comments are created for
    i.e challenge, tool, post ...
    */
    const {challengeId, apiUserId} = this.props

    const options = {
      variables: {
        challengeId,
        userId: apiUserId,
        text: this.state.commentText,
      },
      refetchQueries: [{
        query: COMMENTS_ON_CHALLENGE_QUERY,
        variables: {challengeId},
      }],
    }
    try{
      this.setState({createInProgress:true})
      await this.props.commentCreateMutation(options)
      this.setState({commentText:'', createInProgress:false}) //clears input
    }
    catch(err){
      this.setState({createInProgress:false})
      logException(err, {
      action: "handleCommentCreate function in ChallengeCommentsContainer"
      })
    }
  }

  handleDeleteComment = async (commentId) => {
    const options = {
      variables: {
        commentId
      },
      refetchQueries: [{
        query: COMMENTS_ON_CHALLENGE_QUERY,
        variables: { challengeId: this.props.challengeId},
      }],
    }
    try{
      this.setState({deleteInProgress:true})
      await this.props.deleteCommentMutation(options)
      //clear input, close delete modal
      this.setState({
        commentText: '',
        deleteCommentId: '',
        deleteInProgress:false
      })
    }
    catch(err){
      logException(err, {
      action: "handleCommentDelete function in ChallengeCommentsContainer"
      })
      //stop deleteProgress
      this.setState({deleteInProgress:false})
    }
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

const mapStateToProps = (state) => ({
  userImageUrl: state.app.auth.profile.picture,
  apiUserId: state.app.auth.apiUserId,
  isAuthenticated: state.app.auth.isAuthenticated,
})

export default connect(mapStateToProps)(CommentSectionWithMutations)
