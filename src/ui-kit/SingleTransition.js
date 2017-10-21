import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

/* -------------------------------------------------------------------------
<SingleTransition /> wraps children in a div that is stylable based on timed
in and out transitions (can use to animate). Mounts and unmounts based on the
isMounted prop.
----------------------------------------------------------------------------*/

class SingleTransition extends Component {
  static PropTypes = {
    /* component won't render unless isMounted === true , unmounts automatically
    when isMounted changes from true to false */
    isMounted: PropTypes.bool.isRequired,
    // times in milliseconds:
    enterTime: PropTypes.number.isRequired,
    exitTime: PropTypes.number.isRequired,
    /* Styles accepts css string */
    enteringStyle: PropTypes.string, // for duration of enterTime prop
    enteredStyle: PropTypes.string, //children mounted & enteringTime has lapsed
    exitingStyle: PropTypes.string, // for duration of exitingTimeProp
    children: PropTypes.node.isRequired,
  }

  state = {
    in: false
  }

  componentDidMount = () => {
    this.props.isMounted && this.setState({in: true})
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isMounted) {
      this.setState({in: true})
    }
    if (this.props.isMounted && !nextProps.isMounted){
      this.setState({in:false})
    }
  }

  getStyles = (status) => {
    const {enteringStyle, enteredStyle, exitingStyle} = this.props
    switch (status) {
      case 'entering':
        return enteringStyle
      case 'entered':
        return enteredStyle
      case 'exiting':
        return exitingStyle
      default:
        return ''
    }
  }

  render(){
    const {enterTime, exitTime, children} = this.props
    return(
      <Transition in={this.state.in}
        timeout={{enter:enterTime, exit:exitTime}}
        mountOnEnter={true}
        unmountOnExit={true}>
        {status => {
          return(
              <Box styles={this.getStyles(status)}>
                {children}
              </Box>
            )
          }
        }
      </Transition>
    )
  }
}

const Box = styled.div`
  ${props =>{return(props.styles)}}
`

export default SingleTransition
