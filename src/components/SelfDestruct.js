import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {css, keyframes} from 'styled-components'
import Transition from 'react-transition-group/Transition'
import {bounceIn, fadeOut} from 'styles/animations/keyframes'
import {Avatar} from 'ui-kit'

/*
Self destructing composite component with customizable in/out animations.
Children stay unaltered for length of 'stayDuration' prop and leave the DOM afer
exitAnimation Completes/
*/

const Box = styled.div`
height: 50px;
width: 50px;
${props => {
  switch (props.state) {
    case 'entering':
      return css`
      animation-duration: ${props.enterAnimationDuration}ms;
      animation-name: ${bounceIn};
      `
    case 'exiting':
      return(css`
        animation-duration: ${props.exitAnimationDuration}ms;
        animation-name: ${fadeOut};
        `)
    default:
      break
    }
  }}
`

class SelfDestruct extends Component {
  state = {
    in: false
  }
  componentDidMount = () => {
    this.setState({in:true})
  }
  toggle = () => {
    this.setState({in:!this.state.in})
  }
  render(){
    const {enterAnimationDuration, exitAnimationDuration, stayDuration} = this.props
    const duration = {
      enter: enterAnimationDuration + stayDuration,
      exit: exitAnimationDuration
    }
    const userPictureUrl = "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14079619_10154275347846251_1836046172102598566_n.jpg?oh=ee0f539bcb033315744599dfc7c02854&oe=5A55AE1C"
    return(
      <div>
        <div onClick={this.toggle}>click me</div>
        <Transition
          in={this.state.in}
          timeout={duration}
          onEntered={this.toggle}
          unmountOnExit={true}
          >
          {state => <Box state={state}
            enterAnimationDuration={enterAnimationDuration}
            exitAnimationDuration={exitAnimationDuration}
            >
              {this.props.children}
            {/* <Avatar imageUrl={userPictureUrl} size='25px'/> */}
          </Box>}
        </Transition>
      </div>
    )
  }
}

SelfDestruct.propTypes = {
  enterAnimationDuration: PropTypes.number.isRequired, //ms
  exitAnimationDuration: PropTypes.number.isRequired, //ms
  stayDuration: PropTypes.number.isRequired, //ms
  children: PropTypes.node.isRequired,
}

export default SelfDestruct
