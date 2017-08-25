import React,{Component} from 'react'
import PropTypes from 'prop-types'
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
    addUpvoteMutation: PropTypes.func.isRequired,
    removeUpvoteMutation: PropTypes.func.isRequired,
    mutationVariables: PropTypes.object.isRequired,
  }

  disableUpvote = () => {
    this.setState({upvoteInProgress: true})
  }
  enableUpvote = () => {
    this.setState({upvoteInProgress: false})
  }
  handleToggleUpvote = async () => {
    const {
      userDidUpvote, //returns an array with the current user if user upvoted
      addUpvoteMutation,
      removeUpvoteMutation
    } = this.props

    const variables = this.props.mutationVariables
      //userDidUpvote array empty if user did not upvote:
    if (userDidUpvote.length > 0) {
      this.disableUpvote()
      await removeUpvoteMutation({variables})
      this.enableUpvote()

    }
    else {
      this.disableUpvote()
      await addUpvoteMutation({variables})
      this.enableUpvote()
    }
  }
  handleToggleUpvoteCallback = () => {
    this.handleToggleUpvote()
  }

  render(){
    return(
    <Box>
      <FaIconButton
        inline={true}
        size="25px"
        // onClick={() => requireAuth(this.onClick)}
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

export default ChallengeUpvote
