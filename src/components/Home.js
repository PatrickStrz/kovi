//react + redux
import React,{Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  showCreateChallengeView,
  hideChallengeDetailView,
} from '../actions/challenge-actions'
//lib + other
import {requireAuth} from '../lib/auth'
import styled from 'styled-components'
//Components
import ChallengeListContainer from './ChallengeListContainer'
import ChallengeDetailContainer from './ChallengeDetailContainer'
import ChallengeCreateContainer from 'components/ChallengeCreateContainer'
import Dialog from 'ui-kit/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import HomeLayout from 'components/layouts/HomeLayout'

const ChallengeListBox = styled.div`
  margin-top: 70px;
  margin-bottom: 70px; /* so can see bottom of infinite scroll list */
`
const Box = styled.div`
  overflow: hidden;
`
const RightContent = styled.div`
  top:15vh;
  height:70vh;
  position:fixed;
  background-color: rgb(213, 213, 213);
  width: 25vw;
  right:0px;
  border-radius: 3px;
  overflow-y:auto;
  ::-webkit-scrollbar {
    display: none;
  } /* hides scrollbar*/
`
class Home extends Component {
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
    <Dialog
      title={'ChallengeDetail'}
      isOpen={true}
      handleClose={this.props.hideChallengeDetailView}
    >
      <ChallengeDetailContainer id={this.props.openChallengeDetailViewId}/>
    </Dialog>
  )

  render(){
    const {
        openChallengeDetailViewId,
        showCreateChallengeView
      } = this.props

    const centerContent = (
      <ChallengeListBox>
        <ChallengeListContainer />
      </ChallengeListBox>
    )

    /*--------- render return --------*/

    return(
      <div>
        <HomeLayout
          centerPanelContent={centerContent}
          rightPanelContent={
          <Box>
            <RightContent>
          </RightContent></Box>}
          showLines={false}
        />
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
        <ChallengeCreateContainer />
        {/* conditionally rendering modal helps reduce number of DOM nodes: */}
        { openChallengeDetailViewId && this.renderChallengeDetailView()}
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
