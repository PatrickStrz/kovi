import React, {Component} from 'react'
import PropTypes from 'prop-types'
//lib + other
import styled from 'styled-components'
import DOMPurify from 'dompurify' //prevents XSS
import {colors, muiColors} from 'styles/theme/colors'
//components
import ChallengeCommentsContainer from 'components/challenges/ChallengeCommentsContainer'
import ChallengeFormContainer from 'components/challenges/ChallengeFormContainer'
import FaIcon from 'ui-kit/icons/FaIcon'

/*
 Note: Because rendering <ChallengingCommentContainer/> in this element,
commentsquery is only performed after query in ChallengeDetailContainer
container completes.For this use case it works since we do not want comments to
render before the body.
*/

const MarkdownBox = styled.div`
  background-color: #d2fffc;
  border-radius: 3px;
  padding: 20px;
`
const Title = styled.h2`
  color: #49494a;
`
const CommentsHeading = styled.h4`
  color: ${colors.lightGrey};
`
const LineBreak = styled.hr`
  border: solid 1px ${colors.faintGrey};
`

export default class ChallengeDetail extends Component{
  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired, //html string
    id: PropTypes.string.isRequired,
    apiUserId: PropTypes.string,
    authorId: PropTypes.string.isRequired,
  }

  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({edit: !this.state.edit})
  }

  closeEdit = () => {
    this.setState({edit:false})
  }

  renderBody = () => {
    const {body, id, title} = this.props
    if (this.state.edit) {
      return(
        <ChallengeFormContainer
          defaultValues={{title, body}}
          update={true}
          challengeId={id}
          onUpdateComplete={this.closeEdit}
        />
      )
    }
    else{
      return(
      <div>
        <MarkdownBox>
          <div
            className="content"
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(body)}}
          />
        </MarkdownBox>
      </div>
      )
    }
  }

  renderEditButton = () => {
    const {apiUserId, authorId} = this.props
    if (apiUserId === authorId){
      return(
        <FaIcon
          faClassName={this.state.edit ? "fa-close" : "fa-pencil"}
          size="25px"
          onClick={this.toggleEdit}
          color={colors.lightGrey}
          hoverColor={muiColors.secondary1}
        />
      )
    }
  }

  render(){
    const {id, title} = this.props
    return(
      <div>
        {this.renderEditButton()}
        <Title>{title}</Title>
        {this.renderBody()}
        <LineBreak />
        <CommentsHeading>Discussion</CommentsHeading>
        <ChallengeCommentsContainer challengeId={id} on />
      </div>
    )
  }
}
