import React,{Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { showCreateChallengeView } from '../actions/challenge-actions'

import {requireAuth} from '../lib/auth'

import ChallengeList from './ChallengeList'
import {Row} from 'react-flexbox-grid'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import MoUpvote from './MoUpvote'

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
        <MoUpvote/>
        <Row>
          <ChallengeList />
          <FloatingActionButton
            backgroundColor='#38c1be'
            mini={true}
            zDepth={2}
            style={this.styles.actionButton}
            onTouchTap={() => requireAuth(this.props.showCreateChallengeView)}
          >
            <ContentAdd/>
          </FloatingActionButton>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      showCreateChallengeView
    }, dispatch)
}

export default connect(null,mapDispatchToProps)(Home)
