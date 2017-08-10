//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {COMMENTS_ON_CHALLENGE} from '../gql/Comment/queries'
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
      <CommentSection comments={this.props.data.allComments} />
    )
  }
}

const ChallengeCommentsApollo = graphql(
  COMMENTS_ON_CHALLENGE,{
    options: ({challengeId}) => ({ variables: {challengeId}})
  })(ChallengeCommentsContainer)

export default ChallengeCommentsApollo
