//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {COMMENTS_ON_CHALLENGE} from '../gql/Comment/queries'
//helpers+other
// import {muiColors} from '../lib/theme/colors'
import {logException} from '../config'
//components
import GenericError from './commons/GenericError'

class ChallengeCommentsContainer extends Component{
  static propTypes = {
    challengeId: PropTypes.string.isRequired
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
        Comments!
      </div>
    )
  }
}

const ChallengeCommentsApollo = graphql(
  COMMENTS_ON_CHALLENGE,{
    options: ({challengeId}) => ({ variables: {challengeId}})
  })(ChallengeCommentsContainer)

export default ChallengeCommentsApollo
