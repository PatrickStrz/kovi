import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Avatar} from 'ui-kit'
import {SelfDestruct} from 'ui-kit'

// user avatar that pops in and out on state change -->

class AvatarPop extends Component {
  state = {
    show: false,
  }
  static propTypes = {
    userPictureUrl: PropTypes.string.isRequired,
    uniqueEventId: PropTypes.string.isRequired,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    placeholder: PropTypes.node,
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userPictureUrl &&
      (nextProps.uniqueEventId !== this.props.uniqueEventId)
    ){
      this.setState({show: true})
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.show && this.props.onShow){
      this.props.onShow()
    }
  }

  onSelfDestruct = () => {
    this.setState({show:false})
    this.props.onHide && this.props.onHide()
  }

  renderPoppingAvatar = () => {
    const {placeholder} = this.props
    const {userPictureUrl} = this.props

    if (this.state.show) {
      return(
        <SelfDestruct
          enterAnimationDuration={500}
          exitAnimationDuration={1000}
          stayDuration={2000}
          onSelfDestruct={this.onSelfDestruct}
        >
          <Avatar imageUrl={userPictureUrl} size='25px'/>
        </SelfDestruct>
      )
    }
    else {
      if (placeholder) {
        return <div>{placeholder}</div>
      }
      else {
        return ''
      }
    }
  }

  render () {
    return (
      <div>
        {this.renderPoppingAvatar()}
      </div>
    )
  }
}

export default AvatarPop
