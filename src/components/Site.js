import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { withRouter } from 'react-router-dom'
import {checkLogin, logout, userSyncSuccess} from '../actions/auth-actions'
import {login} from '../lib/auth'
//own components + stylesheets
import SyncUser from './SyncUser'
import BottomBar from './BottomBar'
import Navbar from './navbar/Navbar'
import Scoreboard from './scoreboard/Scoreboard'
import '../styles/css/layout.css'
import {
  HEADER_Z_INDEX,
  SCOREBOARD_Z_INDEX,
} from '../styles/z-index'
//external components + styling
import {Grid} from 'react-flexbox-grid'
import Headroom from 'react-headroom'

class Site extends Component {

  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  state = {
    scoreboardVisible:false
  }

  renderSyncUser = () => {
    const {auth0Authenticated, userSynced, userSyncSuccess, profile} = this.props
    if (auth0Authenticated && !userSynced ){
      return(<SyncUser
        logout={logout}
        handleUserSyncSuccess={userSyncSuccess}
        profile={profile}
      />)
    }
  }

  render(){
    const {
      auth0Authenticated,
      logout,
      profile,
      userSynced,
      children,
    } = this.props

    const styles = {
      headroom: {
        zIndex: HEADER_Z_INDEX
      },
      scoreboard:{
        display: this.state.scorecardVisible ? 'block' : 'none',
        zIndex: SCOREBOARD_Z_INDEX,
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

    return(
      <div style={styles.main}>
      {/* component that syncs or creates a user depending on redux state: */}
        {this.renderSyncUser()}
      <Headroom style={styles.headroom}
        onPin={()=>this.setState({scorecardVisible:false})}
        onUnpin={()=>this.setState({scorecardVisible:true})}
        >
        <Navbar
          handleLogout={logout}
          handleLogin={login}
          auth0Authenticated={auth0Authenticated}
          userSynced={userSynced}
          profile={profile}
        />
      </Headroom>
      <div style={styles.scoreboard}>
        <Scoreboard />
      </div>
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
    auth0Authenticated: state.app.auth.auth0Authenticated,
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
