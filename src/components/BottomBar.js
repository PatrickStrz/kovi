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
import {resetLastContributor} from 'actions/score-actions'
//helpers + other
import styled from 'styled-components'
import {media} from 'styles/media-queries'
//components
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Community from 'components/community/Community'
import Paper from 'material-ui/Paper'
import FilterList from 'material-ui/svg-icons/content/filter-list'
import Notifications from 'material-ui/svg-icons/social/notifications'
import Public from 'material-ui/svg-icons/social/public'
import Dialog from 'ui-kit/Dialog'
import MuiDrawer from 'ui-kit/MuiDrawer'
import Placeholder from 'components/Placeholder'
import {AvatarPop} from 'ui-kit'

const NotificationsIcon = <Notifications />
const FilterIcon = <FilterList />
const PublicIcon = <Public style={{color:'#757575'}} />

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
    showAvatarPop: false,
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
  handleCommunityClose = () => this.props.hideCommunityMobile()
  renderDialog = () => {
    const {
      isNotificationMobileOpen,
      isFilterMobileOpen,
      hideNotificationsMobile,
      hideFilterMobile,
    } = this.props

    let title
    let content
    let handleClose

    if (isNotificationMobileOpen){
      title = 'Notifications'
      content = "No new notifications ヽ(•‿•)ノ"
      handleClose = () => hideNotificationsMobile()
    }
    if (isFilterMobileOpen){
      title = "Filter"
      content = "Coming Soon!"
      handleClose = () => hideFilterMobile()
    }
    return(
      title && (
      <Dialog
        isOpen={true}
        handleClose={handleClose}
        title={title}
      >
        <Placeholder title={title} content={content}/>
      </Dialog>
      )
    )
  }

  renderCommunityIcon = () => {
    return(
      <AvatarPop
        userPictureUrl={this.props.userPictureUrl}
        uniqueEventId={this.props.communityScoreEventId}
        placeholder={PublicIcon}
        onHide={this.onHideAvatarPop}
      />
    )
  }

  onHideAvatarPop = () => {
    this.props.resetLastContributor()
  }

  render() {
    const {
      showNotificationsMobile,
      showFilterMobile,
      showCommunityMobile,
    } = this.props

    return (
    <div>
      <BottomBarBox>
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
            icon={this.renderCommunityIcon(this.props)}
            onTouchTap={()=> this.handleItemClick(2,showCommunityMobile)}
          />
        </BottomNavigation>
        {this.renderDialog()}
      </Paper>
      </BottomBarBox>
      <MuiDrawer
        style={{zIndex:1000}}
        isOpen={this.props.isCommunityMobileOpen}
        docked={false}
        handleClose={this.handleCommunityClose}
        >
          {this.props.isCommunityMobileOpen && <Community/> }
      </MuiDrawer>
    </div>
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
      resetLastContributor,
    }, dispatch)
}

const mapStateToProps = (state) => ({
  isNotificationMobileOpen: state.app.bottomBar.isNotificationMobileOpen,
  isFilterMobileOpen: state.app.bottomBar.isFilterMobileOpen,
  isCommunityMobileOpen: state.app.bottomBar.isCommunityMobileOpen,
  userPictureUrl: state.app.scores.lastContributor.pictureUrl,
  communityScoreEventId: state.app.scores.communityScoreEventId,
})

//Hides Bottom Bar for screens larger than md.

const BottomBarBox = styled.div`
  display:none;
  ${media.md`display:block;`}
  position: fixed;
  bottom:0;
  margin-top:40;
`

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar)
