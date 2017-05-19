import React,{Component} from 'react'
// import {graphql, connect} from 'react-apollo'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import {checkLogin, logout} from '../actions/auth-actions'
import {login} from '../lib/auth'
import {userQuery} from '../queries/user-queries'

class Site extends Component {

  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isAuthenticated){
      this.props.data.refetch()
    }
  }

  styles = {
    body: {
      backgroundColor:"#f6f0f0",
      textAlign: "center"
    }
  }

  render(){
    if (!this.props.data.loading){
      // console.log('not loading')
      if (this.props.isAuthenticated && !this.props.profileSynced){
        alert("user:"+this.props.data.user.id)
      }
    }
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

const SiteApollo = graphql(userQuery, {options: {fetchPolicy: 'network-only' }})(Site)

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profileSynced: state.auth.profileSynced,
    profile: state.auth.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      checkLogin,
      logout
    }, dispatch)
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Site))
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteApollo))
