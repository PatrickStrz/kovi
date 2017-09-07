import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
//other
import {requireAuth} from 'lib/auth'
import {colors} from 'styles/theme/colors'
//components
import Popover from 'ui-kit/Popover'
import ProfileCardContainer from 'components/ProfileCardContainer'
import UserHeader from 'ui-kit/UserHeader'
import {FaIconButton} from 'ui-kit/icons'

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
    comment: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
      user: PropTypes.object.isRequired,
    }).isRequired,
    childComment: PropTypes.bool,
    onDeleteClick: PropTypes.func.isRequired, // accepts commentId argument
    apiUserId: PropTypes.string,
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.comment.id)
  }


  renderDelete = () => {
    const {apiUserId, comment} = this.props
    if (apiUserId === comment.user.id ){
      return(
        <FaIconButton
          onClick={()=>requireAuth(
            this.handleDeleteClick
          )}
          color={colors.lightGrey}
          hoverColor={colors.errorRed}
          faClassName="fa-trash"
        />
      )
    }
    else{
      return
    }
  }

  render(){
    const commentAvatarSize = '35px'
    const childCommentAvatarSize = '25px'

    const {comment, childComment} = this.props

    return(
      <CommentBox
        key={'comment' + comment.id}>
        <CommentHeader>
          <Popover
            renderedInDialog={true}
            body={<ProfileCardContainer userId={comment.user.id} />}
          >
            <UserHeader
              imageUrl={comment.user.picture}
              userName={comment.user.name}
              avatarSize={childComment ? childCommentAvatarSize : commentAvatarSize}
            />
          </Popover>
          {this.renderDelete()}
        </CommentHeader>
        <CommentText>{comment.text}</CommentText>
      </CommentBox>
    )
  }
}

export default Comment
