import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactTimeout from 'react-timeout'
import {Avatar} from 'ui-kit'
import Animation from 'ui-kit/Animation'
import {SelfDestruct} from 'ui-kit'

class ProfilePop extends Component {
  state = {
    show: false,
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userPictureUrl && nextProps.communityScoreEventId){
      this.setState({show: true})
      // this.props.setTimeout(this.hide, 3000)
    }
  }

  render () {
    const {userPictureUrl} = this.props
    return (
      <div>

          {this.state.show &&  <SelfDestruct
              enterAnimationDuration={500}
              exitAnimationDuration={1000}
              stayDuration={2000}
              onSelfDestruct={()=>this.setState({show:false})}
            > <Avatar imageUrl={userPictureUrl} size='25px'/></SelfDestruct>}


      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userPictureUrl: state.app.scores.lastContributor.pictureUrl,
  communityScoreEventId: state.app.scores.communityScoreEventId
})

export default ReactTimeout(connect(mapStateToProps)(ProfilePop))
