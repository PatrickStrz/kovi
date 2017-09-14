import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Avatar} from 'ui-kit'
import {SelfDestruct} from 'ui-kit'

// profile that pops in and out on state change -->

class ProfilePop extends Component {
  state = {
    show: false,
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userPictureUrl && nextProps.communityScoreEventId){
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

const mapStateToProps = (state) => ({
  userPictureUrl: state.app.scores.lastContributor.pictureUrl,
  communityScoreEventId: state.app.scores.communityScoreEventId
})

export default connect(mapStateToProps)(ProfilePop)
