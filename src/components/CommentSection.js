import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//lib + other
import styled from 'styled-components'
import {colors} from 'lib/theme/colors'
//components
import UserHeader from 'ui-components/UserHeader'
import CommentCreate from 'ui-components/CommentCreate'

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

class CommentSection extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
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
        <CommentCreate avatarImageUrl={this.props.userImageUrl} />
      </CommentSectionContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  userImageUrl: state.app.auth.profile.picture,
})

export default connect(mapStateToProps)(CommentSection)
