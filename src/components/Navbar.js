import React,{Component} from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import {login} from '../lib/auth'
import AuthService from '../lib/AuthService'

class Navbar extends Component {
  static propTypes = {
    handleLogout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }
  state = {
    isLoggedIn: AuthService.loggedIn()
  }

  styles = {
    title: {
      color: '#3f51b5',
    },
    navbar: {
      backgroundColor:"#ffffff",
    }
  }

  render(){
    const {handleLogout} = this.props
    return(
      <AppBar
        style={this.styles.navbar}
        titleStyle={this.styles.title}
        title="KOVI">
        { this.props.isAuthenticated ? <RaisedButton label="Log out"onClick={() => handleLogout()} /> : <RaisedButton label="Log in" onClick={()=> login()}/>}
      </AppBar>
    )
  }
}

export default Navbar
