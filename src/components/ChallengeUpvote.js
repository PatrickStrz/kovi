import React,{Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {requireAuth} from '../lib/auth'
import {
  ADD_CHALLENGE_UPVOTE_MUTATION,
  REMOVE_CHALLENGE_UPVOTE_MUTATION,
} from '../gql/Challenge/mutations'
import IconButton from 'material-ui/IconButton'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import {muiColors, colors} from '../lib/theme/colors'
import PropTypes from 'prop-types'
import MoUpvote from './MoUpvote'
import '../styles/css/mo-upvote.css'

class ChallengeUpvote extends Component{
  state = { upvoteInProgress: false, animate: false}
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
      this.setState({animate:false})
    }
    else {
      this.disableUpvote()
      await addChallengeUpvoteMutation({variables})
      this.enableUpvote()
      this.setState({animate:true})
    }
  }


  render(){
    const styles = {
      iconColor: this.props.userDidUpvote.length > 0 ? muiColors.secondary1 : colors.lightGrey,
      icon: {
        height: 25,
        width: 25
      },
      count: {
        position:'relative',
        right: 7,
        bottom: 4,
        fontSize: 14,
        color: colors.lightGrey
      }
    }

    const userDidUpvote = this.props.userDidUpvote.length > 0 ? true : false

    return(
    //used span so component can be used inline:

    <div>
      <MoUpvote
        userDidUpvote={userDidUpvote}
        animate={this.state.animate}
        uniqueId={`challenge-like-${this.props.challengeId}`}
        handleClick={() =>{requireAuth(this.handleToggleUpvote)} }
        ></MoUpvote>
      {/* <IconButton
        onTouchTap={() => requireAuth(this.handleToggleUpvote)}
        iconStyle={styles.icon}
        disabled={this.state.upvoteInProgress}
      >
        <ThumbUp
          color={styles.iconColor}
        />
      </IconButton> */}

      <span style={styles.count}>{this.props.upvotesCount}</span>
    </div>
    )
  }
}

const ChallengeUpvoteApollo = compose(
  graphql(ADD_CHALLENGE_UPVOTE_MUTATION, {name: "addChallengeUpvoteMutation"}),
  graphql(REMOVE_CHALLENGE_UPVOTE_MUTATION, {name: "removeChallengeUpvoteMutation"}),
)(ChallengeUpvote)

export default ChallengeUpvoteApollo
