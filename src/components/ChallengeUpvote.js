import React,{Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {requireAuth} from '../lib/auth'
import {
  addChallengeUpvoteMutation,
  removeChallengeUpvoteMutation,
} from '../mutations/challenge-mutations'
import {allChallengesQuery} from '../queries/challenge-queries'
import IconButton from 'material-ui/IconButton'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import {muiColors} from '../lib/theme/colors'
import PropTypes from 'prop-types'

class ChallengeUpvote extends Component{
  state = { upvoteInProgress: false}
  static propTypes = {
    userDidUpvote: PropTypes.array.isRequired,
    upvotesCount: PropTypes.number.isRequired,
    apiUserId: PropTypes.string,
    challengeId: PropTypes.string.isRequired,
    allChallengesQueryVariables: PropTypes.object.isRequired,
  }

  disableUpvote = () => {
    this.setState({upvoteInProgress: true})
  }
  enableUpvote = () => {
    this.setState({upvoteInProgress: false})
  }
  handleToggleUpvote = async () => {
    const {
      apiUserId,
      challengeId,
      userDidUpvote, //returns an array with the current user if user upvoted
      removeChallengeUpvoteMutation,
      addChallengeUpvoteMutation
    } = this.props
    const variables = {
        "userId": apiUserId ,
        "challengeId": challengeId
      }
    const options = {
        variables,
        refetchQueries: [{
        query: allChallengesQuery,
        variables: this.props.allChallengesQueryVariables
      }]
    }
    if (userDidUpvote.length > 0) {
      this.disableUpvote()
      await removeChallengeUpvoteMutation(options)
      this.enableUpvote()

    }
    else {
      this.disableUpvote()
      await addChallengeUpvoteMutation(options)
      this.enableUpvote()
    }
  }
  handleToggleUpvoteCallback = () => {
    this.handleToggleUpvote()
  }

  render(){
    return(
      <div>
        <span style={{fontSize: 30, color: '#424040'}}><div>{this.props.upvotesCount}</div></span>
        <IconButton
          style={{paddingTop: 5}}
          onTouchTap={() => requireAuth(this.handleToggleUpvote)}
          iconStyle={{height: 30, width: 30}}
          disabled={this.state.upvoteInProgress}
        >
          <ThumbUp
            style={{paddingTop: 40, marginTop: "20px"}}
            color={ this.props.userDidUpvote.length > 0 ? muiColors.primary1: "#6f6f6f"}
          />
        </IconButton>
      </div>
    )
  }
}

const ChallengeUpvoteApollo = compose(
  graphql(addChallengeUpvoteMutation, {name: "addChallengeUpvoteMutation"}),
  graphql(removeChallengeUpvoteMutation, {name: "removeChallengeUpvoteMutation"}),
)(ChallengeUpvote)

export default ChallengeUpvoteApollo
