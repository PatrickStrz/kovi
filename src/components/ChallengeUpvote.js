import React,{Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql, compose} from 'react-apollo'
import {
  ADD_CHALLENGE_UPVOTE_MUTATION,
  REMOVE_CHALLENGE_UPVOTE_MUTATION,
} from '../gql/Challenge/mutations'
//other
import {requireAuth} from '../lib/auth'
import styled from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'

const Box = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`
const Count = styled.p`
  color: rgb(166, 163, 163);
  font-size: 14px;
  margin-left: 5px;
`
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
    <Box>
      <FaIconButton
        inline={true}
        size="25px"
        onClick={() => requireAuth(this.handleToggleUpvote)}
        color={this.props.userDidUpvote.length > 0 ? muiColors.secondary1 : colors.lightGrey}
        hoverColor="none"
        faClassName="fa-arrow-circle-up"
        disabled={this.state.upvoteInProgress}
      />
      <Count>{this.props.upvotesCount}</Count>
    </Box>
    )
  }
}

const ChallengeUpvoteApollo = compose(
  graphql(ADD_CHALLENGE_UPVOTE_MUTATION, {name: "addChallengeUpvoteMutation"}),
  graphql(REMOVE_CHALLENGE_UPVOTE_MUTATION, {name: "removeChallengeUpvoteMutation"}),
)(ChallengeUpvote)

export default ChallengeUpvoteApollo
