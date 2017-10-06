import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import Transition from 'react-transition-group/Transition'
import TransitionGroup from 'react-transition-group/TransitionGroup'
// import {fadeOut, pulse} from 'styles/animations/keyframes'
const Box = styled.div`
  animation: ${props => props.animation};
  opacity: ${props => props.opacity};
  color: ${props => props.color}
`

class Animate extends Component {
  state = {
    in: false
  }
  componentDidMount = () => {
    this.props.inProp && this.setState({in: true})
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.inProp) {
      this.setState({in: true})
    }
    if (this.props.inProp && !nextProps.inProp){
      this.setState({in:false})
    }
  }

  // componentWillUnmount = () => {
  //   this.setState({in: false})
  // }
  getOpacity = (state) => {
    if (state === 'entering')   {
      return 0.5
    }
    if (state === 'exiting') {
      return 0.5
    }
  }

  render(){
    return(
      <Transition in={this.state.in} timeout={{enter:2000, exit:2000}} mountOnEnter={true} unmountOnExit={true}>
        {state => {
          return(
            <Box opacity={this.getOpacity(state)}> {this.props.child} {console.log(state)} </Box>
          )
        } }
      </Transition>
    )
  }
}

export default Animate
