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
import Avatar from 'ui-components/Avatar'

const ShowChildrenButton = styled.p`
  color: ${muiColors.secondary1};
  cursor: pointer;
`

const UserName = styled.div`
  color: ${muiColors.primary1};
  display: inline-block;
  position: relative;
  bottom: 6px;
  left: 5px;
`


const CommentText = styled.p`
  color: rgb(52, 52, 52);
  display: inline;
  position: relative;
  left: 15px;
  top: 50%;
  word-wrap: break-word;
`
const UserBox = styled.div`
  position: relative;
`

// const Avatar = styled.div`
//   background-image: url('http://i.stack.imgur.com/Dj7eP.jpg');
//   width: 30px;
//   height: 30px;
//   background-size: cover;
//   /* center the image vertically and horizontally */
//   background-position: center;
//   border-radius: 50%;
//   display: inline-block;
// `

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
        <UserBox>
          <Avatar imageUrl={comment.user.picture}/>
          <UserName>
            {comment.user.name}
          </UserName>
          <CommentText>dfkmlsdfaklnkldsafnklndasklfnklsdnafklnsdklfnklsdaflknsdaklfndsklfnldksnflkdsnflkdsnfklndslkfndkfnkdfkdkfkdfkdfkndkfdkfnkdfnkdnfkdnfkdnfkdnfkndkls</CommentText>
        </UserBox>
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
