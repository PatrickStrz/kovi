import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Avatar} from 'ui-kit'
import {SelfDestruct} from 'ui-kit'

// user avatar that pops in and out on state change -->

class ProfilePop extends Component {
  state = {
    show: false,
  }
  static propTypes = {
    userPictureUrl: PropTypes.string.isRequired,
    uniqueEventId: PropTypes.string.isRequired,
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userPictureUrl && nextProps.uniqueEventId){
      this.setState({show: true})
    }
  }

  renderPoppingAvatar = () => {
    const {userPictureUrl} = this.props
    return(
      <SelfDestruct
        enterAnimationDuration={500}
        exitAnimationDuration={1000}
        stayDuration={2000}
        onSelfDestruct={()=>this.setState({show:false})}
      >
        <Avatar imageUrl={userPictureUrl} size='25px'/>
      </SelfDestruct>
    )
  }

  render () {
    return (
      <div>
        {this.state.show && this.renderPoppingAvatar() }
      </div>
    )
  }
}

export default ProfilePop
