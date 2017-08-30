import React from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import {withRouter} from 'react-router'
import {muiColors} from 'styles/theme/colors'
//components
import AppBar from 'material-ui/AppBar'
import UserIconMenu from './UserIconMenu'
import IconButton from 'material-ui/IconButton'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import UserScore from 'components/scoreboard/UserScore'

const RightElementBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px; /*match left offset of appbar */
`
const ScoreBox = styled.div`
  margin-right: 10px;
`
const Navbar = (props) => {

  const handleTouchTap = () => props.history.push('/')
  const {
    handleLogin,
    handleLogout,
    profile,
    isAuthenticated
  } = props

  const styles = {
    title: {
      cursor: 'pointer',
      color: '#3f51b5',
    },
    navbar: {
      backgroundColor:"#ffffff",
    },
    accountCircleIcon: {
      width: 30,
      height: 30,
    },
  }

  const renderUserControls = () => {
    if (isAuthenticated) {
      return (
        <UserIconMenu picture={profile.picture} handleLogout={handleLogout}/>
      )
    }
    else {
      return (
        // call clear profile
        <IconButton
          onTouchTap={()=>handleLogin()}
          iconStyle={styles.accountCircleIcon}
          tooltip="Login Signup"
        >
          <AccountCircle
            // color={muiColors.primary1}
            color="#363636"
            hoverColor={muiColors.secondary1}
          />
        </IconButton>
      )
    }
  }

  const userControls = renderUserControls()

  return(
    <AppBar
      title={<span style={styles.title}>KOVI</span>}
      onTitleTouchTap={handleTouchTap}
      style={styles.navbar}
      // iconElementRight={userControls}
      iconElementRight={<RightElementBox><ScoreBox><UserScore/></ScoreBox>{userControls}</RightElementBox>}
    />
  )
}

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
}

export default withRouter(Navbar)
