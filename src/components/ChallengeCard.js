//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {showChallengeDetailView,} from '../actions/challenge-actions'
//gql
import {graphql, compose} from 'react-apollo'
import {
  ADD_CHALLENGE_UPVOTE_MUTATION,
  REMOVE_CHALLENGE_UPVOTE_MUTATION,
} from '../gql/Challenge/mutations'
//components
import ChallengeUpvote from './ChallengeUpvote'
import Card from 'ui-kit/Card'

class ChallengeCard extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
    apiUserId: PropTypes.string,
    addChallengeUpvoteMutation: PropTypes.func.isRequired, //apollo
    removeChallengeUpvoteMutation: PropTypes.func.isRequired, //apollo
  }



  render(){
    const {id, userDidUpvote} = this.props.challenge
    const upvotesCount = this.props.challenge._upvotesMeta.count
    const {
      apiUserId,
      showChallengeDetailView,
      addChallengeUpvoteMutation,
      removeChallengeUpvoteMutation,
    } = this.props

    const upvoteMutationVariables = {
        "userId": apiUserId ,
        "challengeId": id,
        "filter":{
          "id": apiUserId
        }
      }

    const getUpvote = () => {
      return(
        <ChallengeUpvote
          userDidUpvote={userDidUpvote}
          apiUserId={apiUserId}
          challengeId={id}
          upvotesCount={upvotesCount}
          style={{paddingBottom:0}}
          addUpvoteMutation={addChallengeUpvoteMutation}
          removeUpvoteMutation={removeChallengeUpvoteMutation}
          mutationVariables={upvoteMutationVariables}
        />
      )
    }

    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`

    return(
      <div>
        <Card
          text={lorem}
          bottomSection={<div>{getUpvote()}</div>}
          onBodyClick={()=>{showChallengeDetailView(id)}}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showChallengeDetailView,
  }, dispatch)
}

const ChallengeCardApollo = compose(
  graphql(ADD_CHALLENGE_UPVOTE_MUTATION, {name: "addChallengeUpvoteMutation"}),
  graphql(REMOVE_CHALLENGE_UPVOTE_MUTATION, {name: "removeChallengeUpvoteMutation"}),
)(ChallengeCard)

export default connect(null,mapDispatchToProps)(ChallengeCardApollo)
