import React,{Component} from 'react'
import {muiColors} from '../../lib/theme/colors'

import CommunityScore from './CommunityScore'
import UserScore from './UserScore'

class Scoreboard extends Component{

  render(){
    const styles = {
      scoreboard:{
        position: 'fixed',
        top:0,
        width: '100vw',
        height: 65,
        backgroundColor: '#ffffff',
        //to match zDepth 1 of material-ui library:
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
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
    <div style={styles.scoreboard}>
        <CommunityScore
          style={{...styles.scores, ...styles.communityScore }}
         />
         <UserScore
           style={{...styles.scores, ...styles.userScore}}
         />
    </div>
    )
  }
}

export default Scoreboard
