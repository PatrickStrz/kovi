import React,{Component} from 'react'
import ChallengeList from './ChallengeList'
import {Row} from 'react-flexbox-grid'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

class Home extends Component{
  styles = {
    actionButton:{
      position: 'fixed',
      right: '3vw',
      bottom: '6vh',
      backgroundColor:'#38c1be',
      zIndex:200
    }
  }

  render(){
    return(
      <div>
        <Row>
          <ChallengeList />
          <FloatingActionButton
            backgroundColor='#38c1be'
            mini={true}
            zDepth={2}
             style={this.styles.actionButton}
          >
            <ContentAdd/>
          </FloatingActionButton>
        </Row>
      </div>
    )
  }
}

export default Home
