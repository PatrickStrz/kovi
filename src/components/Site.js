import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import {checkLogin, logout, userSyncSuccess} from '../actions/auth-actions'
import {login} from '../lib/auth'
import SyncUser from './SyncUser'

class Site extends Component {

  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  styles = {
    body: {
      backgroundColor:"#f6f0f0",
      textAlign: "center"
    }
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
      <div>
        {this.renderSyncUser()}
        
        <Navbar handleLogout={logout}
          handleLogin={login}
          isAuthenticated={isAuthenticated}
          profile={profile}
        />
        <div style={this.styles.body}>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userSynced: state.auth.userSynced,
    profile: state.auth.profile,
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
