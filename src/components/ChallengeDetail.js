import React, {Component} from 'react'
import PropTypes from 'prop-types'
//lib + other
import styled from 'styled-components'
import DOMPurify from 'dompurify' //prevents XSS
import {colors} from 'styles/theme/colors'
//components
import ChallengeCommentsContainer from 'components/ChallengeCommentsContainer'

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
  }
  renderBody = () => {
    const {title, body, id} = this.props
    if (!this.state.edit) {
    }
    else{
      return(
      <div>
        <Title>{title}</Title>
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

  render(){
    const {title, body, id} = this.props
    return(
      <div>
        <Title>{title}</Title>
        <MarkdownBox>
          <div
            className="content"
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(body)}}
          />
        </MarkdownBox>
        <CommentsHeading>Discussion</CommentsHeading>
        <LineBreak />
        <ChallengeCommentsContainer challengeId={id}/>
      </div>
    )
  }
}
