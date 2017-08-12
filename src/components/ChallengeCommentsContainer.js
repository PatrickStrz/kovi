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

  render(){
    const data = this.props.data // apollo client data
    const {createCommentOnChallengeMutation, challengeId} = this.props

    if (data.loading){
      return(<div>...loading</div>)
    }
    if (data.error){
      logException(data.error, {
        action: "COMMENTS_ON_CHALLENGE_QUERY query in ChallengeCommentsContainer"
      })
      return(
        <GenericError/>
      )
    }
    return(
      <CommentSection
        commentCreateMutation={createCommentOnChallengeMutation}
        comments={data.allComments}
        challengeId={challengeId}
      />
    )
  }
}

const ChallengeCommentsApollo = compose(
  graphql(
    COMMENTS_ON_CHALLENGE_QUERY,{
      options: ({challengeId}) => ({variables: {challengeId}})
    }),
  graphql(CREATE_COMMENT_ON_CHALLENGE_MUTATION, {name: 'createCommentOnChallengeMutation'}),
)(ChallengeCommentsContainer)

export default ChallengeCommentsApollo
