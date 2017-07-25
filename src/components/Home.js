import React,{Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  showCreateChallengeView,
  hideChallengeDetailView,
} from '../actions/challenge-actions'

import {requireAuth} from '../lib/auth'

import ChallengeList from './ChallengeList'
import ChallengeDetail from './ChallengeDetail'
import DialogOverlay from './DialogOverlay'
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

  renderChallengeDetailView = () =>(
    <DialogOverlay
      title={'ChallengeDetail'}
      isOpen={true}
      handleClose={this.props.hideChallengeDetailView}
    >
      <ChallengeDetail id={this.props.openChallengeDetailViewId}/>
    </DialogOverlay>
  )


  render(){
    const {
        openChallengeDetailViewId,
        showCreateChallengeView
      } = this.props
    return(
      <div>
        { openChallengeDetailViewId && this.renderChallengeDetailView()}
        <Row>
          <ChallengeList />
          <FloatingActionButton
            backgroundColor='#38c1be'
            mini={true}
            zDepth={2}
            style={this.styles.actionButton}
            //requireAuth accepts a callback:
            onTouchTap={() => requireAuth(showCreateChallengeView)}
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
      showCreateChallengeView,
      hideChallengeDetailView,
    }, dispatch)
}

const mapStateToProps = (state) => ({
  openChallengeDetailViewId: state.app.challenges.openChallengeDetailViewId
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
