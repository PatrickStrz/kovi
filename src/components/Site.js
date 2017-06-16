import React,{Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import {checkLogin, logout, userSyncSuccess} from '../actions/auth-actions'
import {login} from '../lib/auth'
import SyncUser from './SyncUser'
import {Grid, Col, Row} from 'react-flexbox-grid'
import BottomBar from './BottomBar'

class Site extends Component {

  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  styles = {
    body: {
      backgroundColor:"#f6f0f0",
      // textAlign: "center",
    },
    //makes sure that the background fills up the screen
    main: {
      //Make sure background fills screen -->
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    //<---
      backgroundColor:"#f6f0f0",
    },
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
      <div style={this.styles.main}>
        {this.renderSyncUser()}
        <Navbar handleLogout={logout}
          handleLogin={login}
          isAuthenticated={isAuthenticated}
          profile={profile}
        />
        <Grid style={{marginTop:100}}>
          {children}
          <Row>
            {/* <Col xsOffset={1} xs={10} lgOffset={3} lg={6} style={{position: "fixed", bottom:"0", marginTop:40}}> */}


            {/* </Col> */}
          </Row>
        </Grid>
        <div style={{position: "fixed", bottom:"0", marginTop:40, zIndex:1}}>
          <BottomBar/>
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
