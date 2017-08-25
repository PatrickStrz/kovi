import React,{Component} from 'react'
import PropTypes from 'prop-types'
//other
import {requireAuth} from '../lib/auth'
import styled from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'
//components
import FaIconButton from 'ui-kit/icons/FaIconButton'

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

class Upvote extends Component{
  state = { upvoteInProgress: false}

  static propTypes = {
    faIconClassName: PropTypes.string, // http://fontawesome.io/cheatsheet/
    userDidUpvote: PropTypes.bool.isRequired,
    upvotesCount: PropTypes.number.isRequired,
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

    if (userDidUpvote) {
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
    const {userDidUpvote, upvotesCount, faIconClassName} = this.props
    return(
    <Box>
      <FaIconButton
        inline={true}
        size="25px"
        onClick={() => requireAuth(this.handleToggleUpvote)}
        color={userDidUpvote ? muiColors.secondary1 : colors.lightGrey}
        hoverColor="none"
        faClassName={faIconClassName ? faIconClassName : "fa-arrow-circle-up"}
        disabled={this.state.upvoteInProgress}
      />
      <Count>{upvotesCount}</Count>
    </Box>
    )
  }
}

export default Upvote
