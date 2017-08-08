//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {COMMENTS_ON_CHALLENGE} from '../gql/Comment/queries'
//helpers+other
// import {muiColors} from '../lib/theme/colors'
import {logException} from '../config'
import styled from 'styled-components'
import {muiColors} from 'lib/theme/colors'
//components
import GenericError from './commons/GenericError'

const ShowChildrenButton = styled.a`
  color: ${muiColors.primary1};
  cursor: pointer;
`

class ChallengeCommentsContainer extends Component{
  static propTypes = {
    challengeId: PropTypes.string.isRequired
  }

  state = {
    showChildComments:false
  }

  renderComments = () => {
    const comments = this.props.data.allComments
    return (comments.map(comment =>{
      return(
        <div key={'comment'+comment.id}>
          <div>{comment.text}</div>
          <ShowChildrenButton
            onClick={()=>{this.setState({showChildComments:true})}}
          >
            Show Children
          </ShowChildrenButton>
          {this.state.showChildComments && this.renderChildComments(comment.childComments)}
        </div>
      )
    }))
  }

  renderChildComments = (comments) => {
    return(comments.map( comment =>{
      return(
        <div>{comment.text}</div>
        )
      })
    )
  }

  render(){
    const data = this.props.data
    if (data.loading){
      return(<div>...loading</div>)
    }
    if (data.error){
      logException(this.props.data.error, {
      action: "UserScore query in UserScore.js"
      })
      return(
        <GenericError/>
      )
    }
    return(
      <div>
        {this.renderComments()}
      </div>
    )
  }
}

const ChallengeCommentsApollo = graphql(
  COMMENTS_ON_CHALLENGE,{
    options: ({challengeId}) => ({ variables: {challengeId}})
  })(ChallengeCommentsContainer)

export default ChallengeCommentsApollo
