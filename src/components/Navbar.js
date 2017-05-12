import React,{Component} from 'react'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import {login, logout} from '../lib/auth'
import AuthService from '../lib/AuthService'


class Navbar extends Component {

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
    return(
      <AppBar
        // {localStorag}
        style={this.styles.navbar}
        titleStyle={this.styles.title}
        title="KOVI">
        { this.state.isLoggedIn? <RaisedButton label="Log out"onClick={()=> logout()} /> : <RaisedButton label="Log in" onClick={()=> login()}/>}

      </AppBar>

    )
  }
}

export default Navbar
