import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import {checkLogin, logout} from '../actions/auth-actions'
import {login} from '../lib/auth'


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

  render(){
    return(
      <div>
        <Navbar handleLogout={this.props.logout}
          handleLogin={login}
          isAuthenticated={this.props.isAuthenticated}
          profile={this.props.profile}
        />
        <div style={this.styles.body}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
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
