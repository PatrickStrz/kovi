import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  showNotificationsMobile,
  // hideNotificationsMobile,
  showFilterMobile,
  // hideFilterMobile,
  showCommunityMobile,
} from 'actions/bottombar-actions'
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

  handleItemClick = (index, action) => {
    this.select(index) // Animates/ focuses on button
    action()
  }

  render() {
    const {
      showNotificationsMobile,
      showFilterMobile,
      showCommunityMobile,
    } = this.props

    return (
      <Paper zDepth={1} style={this.styles.body}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} >
          <BottomNavigationItem
            label="Filter"
            icon={FilterIcon}
            onTouchTap={()=> this.handleItemClick(0,showFilterMobile)}
          />
          <BottomNavigationItem
            label="Notifications"
            icon={NotificationsIcon}
            onTouchTap={()=> this.handleItemClick(1,showNotificationsMobile)}
          />
          <BottomNavigationItem
            label="Community"
            icon={PublicIcon}
            onTouchTap={()=> this.handleItemClick(2,showCommunityMobile)}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      showNotificationsMobile,
      // hideNotificationsMobile,
      showFilterMobile,
      // hideFilterMobile,
      showCommunityMobile,
    }, dispatch)
}

export default connect(null,mapDispatchToProps)(BottomBar)
