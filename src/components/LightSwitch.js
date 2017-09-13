import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactTimeout from 'react-timeout'
import {Avatar} from 'ui-kit'

class LightSwitch extends Component {
  state = {
    on: false,
    show: false,
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userPictureUrl && nextProps.communityScoreEventId){
      this.setState({show: true})
      this.props.setTimeout(this.hide, 3000)
    }
  }


  toggle = () => {
    this.setState({ on: !this.state.on })
  }
  hide = () => {
    this.setState({ show: false })
  }
  handleClick = (e) => {
    this.props.setTimeout(this.toggle, 3000) // call the `toggle` function after 5000ms
  }
  render () {
    const {userPictureUrl} = this.props
    return (
      <div onClick={this.handleClick} style={{display:(this.state.on ?  'none' : 'block'),}}>
        {this.state.show && <Avatar imageUrl={userPictureUrl} size='25px'/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userPictureUrl: state.app.scores.lastContributor.pictureUrl,
  communityScoreEventId: state.app.scores.communityScoreEventId
})

export default ReactTimeout(connect(mapStateToProps)(LightSwitch))
