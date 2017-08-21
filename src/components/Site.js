import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
//helpers + other
import { withRouter } from 'react-router-dom'
import {checkLogin, logout, userSyncSuccess} from '../actions/auth-actions'
import {login} from '../lib/auth'
//own components + stylesheets
import SyncUser from './SyncUser'
import BottomBar from 'ui-kit/BottomBar'
import Navbar from './navbar/Navbar'
import Scoreboard from './scoreboard/Scoreboard'
import '../styles/css/layout.css'
import {
  HEADER_Z_INDEX,
  SCOREBOARD_Z_INDEX,
} from '../styles/z-index'
//external components
import Headroom from 'react-headroom'

class Site extends Component {

  constructor(props) {
    super(props)
    /* check is Auth0 lock is authenticating after calling AuthService login: */
    this.props.checkLogin()
  }

  state = {
    scoreboardVisible:false
  }

  shouldSyncUser = () => {
    if (this.props.auth0Authenticated && this.props.userSyncRequired){
      return true
    }
    else {
      return false
    }
  }

  render(){
    const {
      isAuthenticated,
      logout,
      profile,
      userSyncSuccess,
      children,
    } = this.props

    const renderSyncUser = () => {
        return(
          <SyncUser
          logout={logout}
          handleUserSyncSuccess={userSyncSuccess}
          profile={profile}
        />)
      }

    const styles = {
      headroom: {
        zIndex: HEADER_Z_INDEX
      },
    }

    return(
      <div>
        {/* Header hidden on down scroll: */}
        <Headroom style={styles.headroom}
          onPin={()=>this.setState({scorecardVisible:false})}
          onUnpin={()=>this.setState({scorecardVisible:true})}
          >
          <Navbar
            handleLogout={logout}
            handleLogin={login}
            isAuthenticated={isAuthenticated}
            profile={profile}
          />
        </Headroom>
        {/* Scoreboard visible only on scroll down */}
        <Scoreboard
          zIndex={SCOREBOARD_Z_INDEX}
          isVisible={this.state.scorecardVisible ? true : false}
        />
        {/* component that syncs or creates a user depending on redux state: */}
        { this.shouldSyncUser() && renderSyncUser() }
        <div>
          {children}
        </div>
        <div className="visible-xs visible-sm"
          style={{position: "fixed", bottom:"0", marginTop:40, zIndex:1}}
        >
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
    userSyncRequired: state.app.auth.userSyncRequired,
    isAuthenticated: state.app.auth.isAuthenticated,
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
