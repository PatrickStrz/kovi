import React, {Component} from 'react'
import {
  showNotificationsMobile,
  hideNotificationsMobile,
  showFilterMobile,
  hideFilterMobile,
}
//components
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
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

  render() {
    return (
      <Paper zDepth={1} style={this.styles.body}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} >
          <BottomNavigationItem
            label="Filter"
            icon={FilterIcon}
            onTouchTap={() => this.select(0)}
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
      showNotificationsMobile,
      hideNotificationsMobile,
      showFilterMobile,
      hideFilterMobile,
    }, dispatch)
}

export default BottomBar
