import React,{Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {requireAuth} from '../lib/auth'
import {
  addChallengeUpvoteMutation,
  removeChallengeUpvoteMutation,
} from '../mutations/challenge-mutations'
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
        "challengeId": challengeId,
        "filter":{
          "id": apiUserId
        }
      }
      //userDidUpvote array empty if user did not upvote:
    if (userDidUpvote.length > 0) {
      this.disableUpvote()
      await removeChallengeUpvoteMutation({variables})
      this.enableUpvote()

    }
    else {
      this.disableUpvote()
      await addChallengeUpvoteMutation({variables})
      this.enableUpvote()
    }
  }
  handleToggleUpvoteCallback = () => {
    this.handleToggleUpvote()
  }

  render(){
    return(
        <IconButton
          onTouchTap={() => requireAuth(this.handleToggleUpvote)}
          iconStyle={{height: 25, width: 25}}
          disabled={this.state.upvoteInProgress}
        >
          <ThumbUp
            color={ this.props.userDidUpvote.length > 0 ? muiColors.primary1: "#adadad"}
          />
        </IconButton>
    )
  }
}

const ChallengeUpvoteApollo = compose(
  graphql(addChallengeUpvoteMutation, {name: "addChallengeUpvoteMutation"}),
  graphql(removeChallengeUpvoteMutation, {name: "removeChallengeUpvoteMutation"}),
)(ChallengeUpvote)

export default ChallengeUpvoteApollo
