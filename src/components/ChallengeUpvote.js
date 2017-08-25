import React,{Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {requireAuth} from '../lib/auth'
import {
  ADD_CHALLENGE_UPVOTE_MUTATION,
  REMOVE_CHALLENGE_UPVOTE_MUTATION,
} from '../gql/Challenge/mutations'
import {muiColors, colors} from 'styles/theme/colors'
import PropTypes from 'prop-types'
//components
import FaIconButton from 'ui-kit/icons/FaIconButton'

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
    // const styles = {
    //   iconColor: this.props.userDidUpvote.length > 0 ? muiColors.secondary1 : colors.lightGrey,
    //   icon: {
    //     height: 25,
    //     width: 25
    //   },
    //   count: {
    //     position:'relative',
    //     right: 7,
    //     bottom: 4,
    //     fontSize: 14,
    //     color: colors.lightGrey
    //   }
    // }

    return(
      <div>
      <FaIconButton
        inline={true}
        size="30px"
        onClick={() => requireAuth(this.handleToggleUpvote)}
        color={this.props.userDidUpvote.length > 0 ? muiColors.secondary1 : colors.lightGrey}
        hoverColor="none"
        faClassName="fa-chevron-up"
        disabled={this.state.upvoteInProgress}
      />
      <span>{this.props.upvotesCount}</span>
      </div>
    )
  }
}

const ChallengeUpvoteApollo = compose(
  graphql(ADD_CHALLENGE_UPVOTE_MUTATION, {name: "addChallengeUpvoteMutation"}),
  graphql(REMOVE_CHALLENGE_UPVOTE_MUTATION, {name: "removeChallengeUpvoteMutation"}),
)(ChallengeUpvote)

export default ChallengeUpvoteApollo
