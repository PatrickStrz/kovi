import React, {Component} from 'react'
import PropTypes from 'prop-types'
//lib + other
import styled from 'styled-components'
import {colors} from 'lib/theme/colors'
//components
import UserHeader from 'ui-components/UserHeader'

const CommentText = styled.p`
  color: #545252;
  word-wrap: break-word;
`

const CommentSectionContainer = styled.div`
  margin: auto;
  justify-content: center;
  width: 80%;
`

const SubCommentSectionWrapper = styled.div`
  border-left: 4px solid ${colors.faintGrey};
  margin-left: 17px;
  padding-left: 20px;
  /* to match margin of CommentText p element: */
  margin-bottom: 16px;
`
const SubCommentSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default class CommentSection extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
  }

  renderComment = (comment, subcomment='') => {
    return(
    <div key={'comment' + comment.id}>
      <UserHeader
        imageUrl={comment.user.picture}
        userName={comment.user.name}
        avatarSize={ subcomment ? 25 : 35 }
      />
      <CommentText>dfkmlsdfaklnkldsafnklndasklfnklsdnafklnsdklfnklsdaflknsdaklfndsklfnldksnflkdsnflkdsnfklndslkfndkfnkdfkdkfkdfkdfkndkfdkfnkdfnkdnfkdnfkdnfkdnfkndkls</CommentText>
    </div>
    )
  }

  renderComments = (comments) => {
    return (comments.map(comment =>{
      return(
          <CommentSectionContainer key={'comment' + comment.id}>
            {this.renderComment(comment)}
            <SubCommentSectionWrapper>
              <SubCommentSectionContainer>
                {this.renderChildComments(comment.childComments)}
              </SubCommentSectionContainer>
            </SubCommentSectionWrapper>
          </CommentSectionContainer>
      )
    }))
  }

  renderChildComments = (comments) => {
    return(comments.map( comment =>{
        return(this.renderComment(comment, 'subcomment'))
      })
    )
  }

  render(){
    return(
      <div>
        {this.renderComments(this.props.comments)}
      </div>
    )
  }
}
