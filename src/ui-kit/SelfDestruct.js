import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import Transition from 'react-transition-group/Transition'
import {bounceIn, fadeOut} from 'styles/animations/keyframes'

/*
Self destructing composite component with customizable in/out animations.
Children stay unaltered for length of 'stayDuration' prop and leave the DOM afer
exitAnimation Completes/
*/

const Box = styled.div`
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
    this.setState({in: true})
  }
  startExit = () => {
    this.setState({in: false})
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
          {state => <Box state={state}
            enterAnimationDuration={enterAnimationDuration}
            exitAnimationDuration={exitAnimationDuration}
            >
              {this.props.children}
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
  onSelfDestruct: PropTypes.func,
}

export default SelfDestruct
