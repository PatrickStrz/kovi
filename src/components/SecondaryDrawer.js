import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import ChallengeListContainerTing from 'components/ChallengeListTing'

export default class SecondaryDrawer extends Component {

  state = {
    open: false
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onClick={this.handleToggle}
        />
        <Drawer width={300} openSecondary={true} open={this.state.open} >
          <AppBar title="AppBar" />
          <ChallengeListContainerTing/>
        </Drawer>
      </div>
    )
  }
}
