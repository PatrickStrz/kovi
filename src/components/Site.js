import React,{Component} from 'react'
import Navbar from './Navbar'
import {checkLogin, logout} from '../actions/auth-actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

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
          isAuthenticated={this.props.isAuthenticated}
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
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      checkLogin,
      logout
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Site)
