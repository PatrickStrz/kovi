//react+redux
import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// helpers+other
import {muiColors} from 'styles/theme/colors'
//components
import CommunityScore from './CommunityScore'
import UserScore from './UserScore'

class Scoreboard extends Component{

  static propTypes = {
    zIndex: PropTypes.number.isRequired,
    isVisible: PropTypes.bool.isRequired,
  }
  render(){
    const styles = {
      scoreboard:{
        position: 'fixed',
        top:0,
        width: '100vw',
        height: 65,
        backgroundColor: '#ffffff',
        zIndex: this.props.zIndex,
        display: this.props.isVisible ? 'block' : 'none',
        //to match zDepth 1 of material-ui library:
        // boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
      },
      scores:{
        fontSize:30,
        position:'fixed',
        top: '3vh',
      },
      userScore: {
        right:'10vw',
        color: muiColors.secondary1,
      },
      communityScore: {
        color: muiColors.primary1,
        left: '10vw',
      },
    }

    const renderUserScore = () => (
      <UserScore
        style={{...styles.scores, ...styles.userScore}}
      />
    )

    return(
    <div style={styles.scoreboard}>
        <CommunityScore
          style={{...styles.scores, ...styles.communityScore }}
        />
        {this.props.isAuthenticated && renderUserScore()}
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.auth.isAuthenticated
})

export default connect(mapStateToProps)(Scoreboard)
