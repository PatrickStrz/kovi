//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {showChallengeDetailView,} from '../actions/challenge-actions'
import ChallengeUpvote from './ChallengeUpvote'
import Card from 'ui-kit/Card'

class ChallengeCard extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
    apiUserId: PropTypes.string,
  }

  render(){
    const {id, userDidUpvote} = this.props.challenge
    const upvotesCount = this.props.challenge._upvotesMeta.count
    const {
      apiUserId,
      showChallengeDetailView,
    } = this.props

    const getUpvote = () => {
      return(
        <ChallengeUpvote
          userDidUpvote={userDidUpvote}
          apiUserId={apiUserId}
          challengeId={id}
          upvotesCount={upvotesCount}
          style={{paddingBottom:0}}
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

export default connect(null,mapDispatchToProps)(ChallengeCard)
