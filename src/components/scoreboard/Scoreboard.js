import React,{Component} from 'react'
import Paper from 'material-ui/Paper'

import {muiColors} from '../../lib/theme/colors'

import CommunityScore from './CommunityScore'
import UserScore from './UserScore'

class Scoreboard extends Component{
  state={animate:false}

  render(){

    const styles = {
      paper:{
        width: '100vw',
        height: 65,
        backgroundColor: '#ffffff',
        top:0
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

    return(
      <Paper
        style={styles.paper}
        zDepth={2}
        >
        <CommunityScore
          style={{...styles.scores, ...styles.communityScore }}
         />
         <UserScore
           style={{...styles.scores, ...styles.userScore}}
         />
      </Paper>
    )
  }
}

export default Scoreboard
