// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
//apollo
import {graphql} from 'react-apollo'
import {
  CHALLENGE_DETAIL_QUERY,
} from '../gql/Challenge/queries'
//other
import DOMPurify from 'dompurify' //prevents XSS
import {colors} from 'lib/theme/colors'
//components
import GenericError from './commons/GenericError'
import ChallengeCommentsContainer from './ChallengeCommentsContainer'
import styled from 'styled-components'

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
export class ChallengeDetail extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render(){
    if (this.props.data.loading){
      return(<p>...Loading</p>)
    }
    if (this.props.data.error){
      return <GenericError error={this.props.data.error} />
    }

    const {id, title, body} = this.props.data.Challenge

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

const ChallengeDetailApollo = graphql(
CHALLENGE_DETAIL_QUERY,{
  options: ({ id }) => ({ variables: { id } }), // coming from own props
})(ChallengeDetail)

export default ChallengeDetailApollo
