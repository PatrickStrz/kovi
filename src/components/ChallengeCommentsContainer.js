//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {COMMENTS_ON_CHALLENGE} from '../gql/Comment/queries'
//helpers+other
import {logException} from '../config'
import styled from 'styled-components'
import {muiColors} from 'lib/theme/colors'
//components
import GenericError from './commons/GenericError'
import UserHeader from 'ui-components/UserHeader'

const ShowChildrenButton = styled.p`
  color: ${muiColors.secondary1};
  cursor: pointer;
`

const CommentText = styled.p`
  color: #545252;
  word-wrap: break-word;
`

const CommentSectionContainer = styled.div`
  margin: auto;
  justify-content: center;
  width: 80%;
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
          <CommentSectionContainer key={'comment'+comment.id}>
            <UserHeader
              imageUrl={comment.user.picture}
              userName={comment.user.name}
            />
            <CommentText>dfkmlsdfaklnkldsafnklndasklfnklsdnafklnsdklfnklsdaflknsdaklfndsklfnldksnflkdsnflkdsnfklndslkfndkfnkdfkdkfkdfkdfkndkfdkfnkdfnkdnfkdnfkdnfkdnfkndkls</CommentText>
            <ShowChildrenButton
              onClick={()=>{this.setState({showChildComments:true})}}
            >
              Show Children
            </ShowChildrenButton>
            {this.state.showChildComments && this.renderChildComments(comment.childComments)}

          </CommentSectionContainer>
      )
    }))
  }

  renderChildComments = (comments) => {
    return(comments.map( comment =>{
      return(
      <div key={'subcomment' + comment.id}>
        <CommentText>{comment.text}</CommentText>
      </div>
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
