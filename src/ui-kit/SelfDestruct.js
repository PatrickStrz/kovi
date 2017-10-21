import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import Transition from 'react-transition-group/Transition'
import {fadeOut, pulse} from 'styles/animations/keyframes'

/*
Component that mounts and unmounts children after a certain duration + in/out
animations. Children stay unaltered for length of 'stayDuration' prop and
leave the DOM afer exitAnimation Completes/
*/

class SelfDestruct extends Component {
  state = {
    in: false
  }

  componentDidMount = () => {
    this.setState({in: true})
  }

  startExit = () => {
    this.setState({in: false})
  }

  renderChildren = (state) => {
    const {enterAnimationDuration, exitAnimationDuration} = this.props
    return(
      <Box state={state}
        enterAnimationDuration={enterAnimationDuration}
        exitAnimationDuration={exitAnimationDuration}
      >
        {this.props.children}
      </Box>
    )
  }

  render(){
    const {
      enterAnimationDuration,
      exitAnimationDuration,
      stayDuration,
      onSelfDestruct,
    } = this.props
    const duration = {
      enter: enterAnimationDuration + stayDuration,
      exit: exitAnimationDuration
    }

    return(
      <div>
        <Transition
          in={this.state.in}
          timeout={duration}
          onEntered={this.startExit}
          unmountOnExit={true}
          onExited={onSelfDestruct && onSelfDestruct}
          >
          {state => this.renderChildren(state) }
        </Transition>
      </div>
    )
  }
}

SelfDestruct.propTypes = {
  enterAnimationDuration: PropTypes.number.isRequired, // milliseconds
  exitAnimationDuration: PropTypes.number.isRequired, // milliseconds
  stayDuration: PropTypes.number.isRequired, // milliseconds
  children: PropTypes.node.isRequired,
  onSelfDestruct: PropTypes.func,
}

const Box = styled.div`
${props => {
  switch (props.state) {
    case 'entering':
      return css`
      animation-duration: ${props.enterAnimationDuration}ms;
      animation-name: ${pulse};
      animation-iteration-count: 2;
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

export default SelfDestruct
