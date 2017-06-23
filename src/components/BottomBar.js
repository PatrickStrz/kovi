import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { showCreateChallengeView } from '../actions/challenge-actions'

import {requireAuth} from '../lib/auth'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
// import AddCircle from 'material-ui/svg-icons/content/add-circle'
import FilterList from 'material-ui/svg-icons/content/filter-list'
import Notifications from 'material-ui/svg-icons/social/notifications'
import Public from 'material-ui/svg-icons/social/public'
const NotificationsIcon = <Notifications />
const FilterIcon = <FilterList />
const PublicIcon = <Public />

class BottomBar extends Component {
  state = {
    selectedIndex: 0,
  }

  styles = {
    body: {
      width:'100vw'
    }
  }

  select = (index) => this.setState({selectedIndex: index})

  handleNewChallenge = () => {
    this.props.showCreateChallengeView()
    this.setState({selectedIndex: 0})
  }

  render() {
    const handleNewChallengeCb = () => this.handleNewChallenge(0)
    return (
      <Paper zDepth={1} style={this.styles.body}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} >
          <BottomNavigationItem
            label="Filter"
            icon={FilterIcon}
            onTouchTap={()=>requireAuth(handleNewChallengeCb)}
          />
          <BottomNavigationItem
            label="Notifications"
            icon={NotificationsIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Community"
            icon={PublicIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      showCreateChallengeView
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(BottomBar)
