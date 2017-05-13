import React,{Component} from 'react'
import Navbar from './Navbar'
import {checkLogin} from '../lib/auth'
import {connect} from 'react-redux'

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
        <h1>authed:{this.props.isAuthenticated}</h1>
        {this.props.isAuthenticated ? <p>authed</p> : <p>not autherd</p>}
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

export default connect(mapStateToProps,null)(Site)
