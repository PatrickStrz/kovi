import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  showNotificationsMobile,
  hideNotificationsMobile,
  showFilterMobile,
  hideFilterMobile,
  showCommunityMobile,
  hideCommunityMobile,
} from 'actions/bottombar-actions'
//helpers + other
import styled from 'styled-components'
//components
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import FilterList from 'material-ui/svg-icons/content/filter-list'
import Notifications from 'material-ui/svg-icons/social/notifications'
import Public from 'material-ui/svg-icons/social/public'
import Dialog from 'ui-kit/Dialog'

const NotificationsIcon = <Notifications />
const FilterIcon = <FilterList />
const PublicIcon = <Public />

const NotificationsView = styled.h1`
  color: rgb(40, 125, 120);
`
const Filter = styled.h1`
  color: rgb(40, 125, 120);
`
const Community = styled.h1`
  color: rgb(40, 125, 120);
`

class BottomBar extends Component {

  static propTypes = {
     /* redux */
    showNotificationsMobile: PropTypes.func.isRequired,
    showFilterMobile: PropTypes.func.isRequired,
    showCommunityMobile: PropTypes.func.isRequired,
    isNotificationMobileOpen: PropTypes.bool.isRequired,
    isFilterMobileOpen: PropTypes.bool.isRequired,
    isCommunityMobileOpen: PropTypes.bool.isRequired,
    /* redux */
  }

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

  renderDialog = () => {
    const {
      isNotificationMobileOpen,
      isFilterMobileOpen,
      isCommunityMobileOpen,
      hideNotificationsMobile,
      hideFilterMobile,
      hideCommunityMobile,
    } = this.props

    let view
    let handleClose
    let title

    if (isNotificationMobileOpen){
      view = <NotificationsView>Notifications</NotificationsView>
      title = 'Notifications'
      handleClose = () => hideNotificationsMobile()
    }
    if (isCommunityMobileOpen){
      view = <Community>Community</Community>
      title = 'Community'
      handleClose = () => hideCommunityMobile()
    }
    if (isFilterMobileOpen){
      view = <Filter>Filter</Filter>
      title = "Filter"
      handleClose = () => hideFilterMobile()
    }
    return(
      view && (
      <Dialog
        isOpen={true}
        handleClose={handleClose}
        title={title}
      >
        {view}
      </Dialog>
      )
    )
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
        {this.renderDialog()}
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
      showCommunityMobile,
      hideCommunityMobile,
    }, dispatch)
}

const mapStateToProps = (state) => ({
  isNotificationMobileOpen: state.app.bottomBar.isNotificationMobileOpen,
  isFilterMobileOpen: state.app.bottomBar.isFilterMobileOpen,
  isCommunityMobileOpen: state.app.bottomBar.isCommunityMobileOpen,
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar)
