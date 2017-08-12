import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//gql
import {COMMENTS_ON_CHALLENGE_QUERY} from '../gql/Comment/queries'
//lib + other
import styled from 'styled-components'
import {colors} from 'lib/theme/colors'
import {XS_MAX} from 'styles/screen-sizes'
import {logException} from '../config'
//components
import UserHeader from 'ui-components/UserHeader'
import InputWithProfile from 'ui-components/InputWithProfile'
import TextButton from 'ui-components/TextButton'

const commentAvatarSize = '35px'
const childCommentAvatarSize = '25px'

const CommentText = styled.p`
  color: #545252;
  word-wrap: break-word;
`

const CommentSectionContainer = styled.div`
  /* horizonally center: */
  margin: auto;
  margin-top: 21px;
  justify-content: center;
  width: 80%;
`

const SubCommentSectionWrapper = styled.div`
  border-left: 4px solid ${colors.faintGrey};
  margin-left: ${commentAvatarSize};
  padding-left: 10px;
  /* to match margin of CommentText p element: */
  margin-bottom: 16px;
`
const SubCommentSectionContainer = styled.div`
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

class CommentSection extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentCreateMutation: PropTypes.func.isRequired,
    challengeId: PropTypes.string.isRequired,
  }

  state = {
    commentText: ''
  }

  renderComment = (comment, subcomment='') => {
    return(
      <div key={'comment' + comment.id}>
        <UserHeader
          imageUrl={comment.user.picture}
          userName={comment.user.name}
          avatarSize={ subcomment ? childCommentAvatarSize : commentAvatarSize }
        />
        <CommentText>{comment.text}</CommentText>
      </div>
    )
  }

  renderComments = (comments) => {
    return (comments.map(comment =>{
      return(
          <div key={'comment' + comment.id}>
            {this.renderComment(comment)}
            <SubCommentSectionWrapper>
              <SubCommentSectionContainer>
                {this.renderChildComments(comment.childComments)}
              </SubCommentSectionContainer>
            </SubCommentSectionWrapper>
          </div>
          )
        }
      )
    )
  }

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
      await this.props.commentCreateMutation(options)
      this.setState({commentText:''}) //clears input
    }
    catch(err){
      logException(err, {
      action: "handleCommentCreate function in ChallengeCommentsContainer"
      })
    }
  }

  renderChildComments = (comments) => {
    return(comments.map( comment =>{
        return(this.renderComment(comment, 'subcomment'))
        }
      )
    )
  }

  render(){
    return(
      <CommentSectionContainer>
        {this.renderComments(this.props.comments)}
        <CreateCommentContainer>
          <InputWithProfile
            avatarImageUrl={this.props.userImageUrl}
            avatarSize="25px"
            placeholder="Write a comment..."
            handleChange={text => this.handleCommentInput(text)}
            value={this.state.commentText}
          />
          <TextButton label="Post" handleSubmit={()=> this.handleCommentSubmit()}/>
        </CreateCommentContainer>
      </CommentSectionContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  userImageUrl: state.app.auth.profile.picture,
  apiUserId: state.app.auth.apiUserId
})

export default connect(mapStateToProps)(CommentSection)
