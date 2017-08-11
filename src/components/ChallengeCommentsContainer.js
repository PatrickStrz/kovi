//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql, compose} from 'react-apollo'
import {COMMENTS_ON_CHALLENGE_QUERY} from '../gql/Comment/queries'
import {CREATE_COMMENT_ON_CHALLENGE_MUTATION} from 'gql/Comment/mutations'
//helpers+other
import {logException} from '../config'
//components
import GenericError from './commons/GenericError'
import CommentSection from 'components/CommentSection'

class ChallengeCommentsContainer extends Component{
  static propTypes = {
    challengeId: PropTypes.string.isRequired
  }

  state = {
    showChildComments:false
  }

  handleCommentCreate = async (userId, challengeId, text) => {
    const options = {
      variables: {
        challengeId,
        userId,
        text,
      }
    }
    try{
      await this.props.createCommentOnChallengeMutation(options)
    }
    catch(err){
      logException(err, {
      action: "handleCommentCreate function in ChallengeCommentsContainer"
      })
    }
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
      <CommentSection
        handleCommentCreate={this.handleCommentCreate} 
        comments={this.props.data.allComments}
      />
    )
  }
}

const ChallengeCommentsApollo = compose(
  graphql(
    COMMENTS_ON_CHALLENGE_QUERY,{
      options: ({challengeId}) => ({ variables: {challengeId}})
    }),
  graphql(CREATE_COMMENT_ON_CHALLENGE_MUTATION, {name: 'createCommentOnChallengeMutation'}),
)(ChallengeCommentsContainer)

export default ChallengeCommentsApollo
