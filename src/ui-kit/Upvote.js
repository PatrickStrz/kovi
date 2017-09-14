import React,{Component} from 'react'
import PropTypes from 'prop-types'
//other
import {requireAuth} from '../lib/auth'
import styled, {css} from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'
import {bounceIn} from 'styles/animations/keyframes'
//components
import FaIconButton from 'ui-kit/icons/FaIconButton'

const Box = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  ${ props => (props.animate) && css`
      animation: ${bounceIn} 0.5s
    `}
`
const Count = styled.p`
  color: rgb(166, 163, 163);
  font-size: 14px;
  margin-left: 5px;
`
//components

class Upvote extends Component{
  static propTypes = {
    faIconClassName: PropTypes.string, // http://fontawesome.io/cheatsheet/
    userDidUpvote: PropTypes.bool.isRequired,
    upvotesCount: PropTypes.number.isRequired,
    addUpvoteMutation: PropTypes.func.isRequired,
    removeUpvoteMutation: PropTypes.func.isRequired,
    mutationVariables: PropTypes.object.isRequired,
  }

  state = { upvoteInProgress: false, animate:false}

  componentWillReceiveProps = (nextProps) =>{
    const prevProps = this.props
    if (!prevProps.userDidUpvote && nextProps.userDidUpvote){
      this.setState({animate:true})
    }
    //resets animation
    if (prevProps.userDidUpvote && !nextProps.userDidUpvote){
      this.setState({animate:false})
    }
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
      this.setState({animate:true})
      this.enableUpvote()
    }
  }
  handleToggleUpvoteCallback = () => {
    this.handleToggleUpvote()
  }

  render(){
    const {userDidUpvote, upvotesCount, faIconClassName} = this.props
    return(
    <Box animate={this.state.animate}>
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
