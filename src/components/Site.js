import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { withRouter } from 'react-router-dom'
import {checkLogin, logout, userSyncSuccess} from '../actions/auth-actions'
import {login} from '../lib/auth'

import SyncUser from './SyncUser'
import BottomBar from './BottomBar'
import Navbar from './navbar/Navbar'
import {Grid} from 'react-flexbox-grid'
import Headroom from 'react-headroom'
import '../styles/css/layout.css'
import {HEADER_Z_INDEX} from '../styles/z-index'

class Site extends Component {

  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  styles = {
    body: {
      backgroundColor:"#f6f0f0",
    },
    headroom: {
      zIndex: HEADER_Z_INDEX
    },
    //makes sure that the background fills up the screen
    main: {
      //Make sure background fills screen -->
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    //<---
      backgroundColor:"#f6f0f0",
    },
  }

  renderSyncUser = () => {
    const {isAuthenticated, userSynced, userSyncSuccess, profile} = this.props
    if (isAuthenticated && !userSynced ){
      return(<SyncUser
        handleUserSyncSuccess={userSyncSuccess}
        profile={profile}
      />)
    }
  }

  render(){
    const {
      isAuthenticated,
      logout,
      profile,
      children,
    } = this.props

    return(
      <div style={this.styles.main}>
        {this.renderSyncUser()}
      <Headroom style={this.styles.headroom}>
        <Navbar handleLogout={logout}
          handleLogin={login}
          isAuthenticated={isAuthenticated}
          profile={profile}
        />
      </Headroom>
        <Grid style={{marginTop:30}}>
          {children}
        </Grid>
        <div className="visible-xs visible-sm" style={{position: "fixed", bottom:"0", marginTop:40, zIndex:1}}>
          <BottomBar/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.app.auth.isAuthenticated,
    userSynced: state.app.auth.userSynced,
    profile: state.app.auth.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      checkLogin,
      logout,
      userSyncSuccess,
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Site))
