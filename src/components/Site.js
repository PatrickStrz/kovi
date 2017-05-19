import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import {checkLogin, logout} from '../actions/auth-actions'
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
    if (this.props.isAuthenticated && !this.props.userSynced ){
      return(<SyncUser />)
    }
  }

  render(){
    const {isAuthenticated, logout, profile, children} = this.props

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
      logout
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Site))
