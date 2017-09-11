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
// lib + other
import {colors} from 'styles/theme/colors'
//components
import Upvote from 'ui-kit/Upvote'
import Card from 'ui-kit/Card'
import {withRouter} from 'react-router'

class ChallengeCard extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
    apiUserId: PropTypes.string,
    addChallengeUpvoteMutation: PropTypes.func.isRequired, //apollo
    removeChallengeUpvoteMutation: PropTypes.func.isRequired, //apollo
    //redux:
    showChallengeDetailView: PropTypes.func.isRequired,
    newUserChallenges: PropTypes.array.isRequired,
  }

  /*
  check if challenge was created by user in this session
  newUserChallenges is an array of newly created challenge id's from redux store
  */
  isNewlyCreated = (challengeId) => {
    if (this.props.newUserChallenges.indexOf(challengeId) >= 0){
        return true
    }
    else {
      return false
    }
  }

  render(){
    const {id, userDidUpvote, title} = this.props.challenge
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

    const upvote = (
        <Upvote
          userDidUpvote={userDidUpvote.length > 0 && true}
          apiUserId={apiUserId}
          challengeId={id}
          upvotesCount={upvotesCount}
          style={{paddingBottom:0}}
          addUpvoteMutation={addChallengeUpvoteMutation}
          removeUpvoteMutation={removeChallengeUpvoteMutation}
          mutationVariables={upvoteMutationVariables}
        />
      )

    return(
      <div>
        <Card
          highlight={this.isNewlyCreated(id)}
          highlightColor={colors.faintTeal}
          text={title}
          bottomSection={upvote}
          // onBodyClick={()=>{showChallengeDetailView(id)}}
          onBodyClick={()=> this.props.history.push(`/challenge/${id}`)}
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

const mapStateToProps = (state) => ({
  newUserChallenges: state.app.challenges.newUserChallenges,
})

const ChallengeCardApollo = compose(
  graphql(ADD_CHALLENGE_UPVOTE_MUTATION, {name: "addChallengeUpvoteMutation"}),
  graphql(REMOVE_CHALLENGE_UPVOTE_MUTATION, {name: "removeChallengeUpvoteMutation"}),
)(ChallengeCard)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengeCardApollo))
