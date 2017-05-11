import React,{Component} from 'react'
import Navbar from './Navbar'
import {checkLogin} from '../lib/auth'
// import Home from './components/Home'

class Site extends Component {

  constructor(props) {
  super(props)
  checkLogin() // check is Auth0 lock is authenticating after login callback
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
        <Navbar />
        <div style={this.styles.body}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Site
