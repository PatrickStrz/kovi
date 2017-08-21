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
import {media} from 'styles/media-queries'
//Components
import ChallengeListContainer from './ChallengeListContainer'
import ChallengeDetailContainer from './ChallengeDetailContainer'
import ChallengeCreateContainer from 'components/ChallengeCreateContainer'
import Dialog from 'ui-kit/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import LayoutHome from 'components/layouts/LayoutHome'

const LayoutAppBox = styled.div`
  min-height:100vh;
  width:100%;
  display: flex;
  flex-basis: auto;
  background-color: #f6f0f0;
  flex-direction: row;
`

const LayoutLeftPanel = styled.div`
 width: 20%;
 border: solid 6px #ee6662;
 ${media.md`display:none;`}
`

const LayoutCenterPanel = styled.div`
 width: 60%;
 ${media.md`width: 100%`}
 border: solid 6px #7be1eb;
 display: flex;
 flex-direction: column;
 `


const LayoutRightPanel = styled.div`
  width: 20%;
  border: solid 6px #ee6662;
  ${media.md`display:none;`}
`

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
    <Dialog
      title={'ChallengeDetail'}
      isOpen={true}
      handleClose={this.props.hideChallengeDetailView}
    >
      <ChallengeDetailContainer id={this.props.openChallengeDetailViewId}/>
    </Dialog>
  )


  render(){

    const centerContent = (
  <div>
    <ChallengeListContainer />
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
  </div>
    )

    const {
        openChallengeDetailViewId,
        showCreateChallengeView
      } = this.props
    return(
      // <LayoutHome centerContent = {}/>
      // <LayoutAppBox>
      //   <LayoutLeftPanel />
      //   <LayoutCenterPanel>
      //     <ChallengeListContainer />
      //     <FloatingActionButton
      //       backgroundColor='#38c1be'
      //       mini={true}
      //       zDepth={2}
      //       style={this.styles.actionButton}
      //       //requireAuth accepts a callback:
      //       onTouchTap={() => requireAuth(showCreateChallengeView)}
      //     >
      //       <ContentAdd/>
      //     </FloatingActionButton>
      //   <ChallengeCreateContainer />
      //   </LayoutCenterPanel>
      //   <LayoutRightPanel />
      //   { openChallengeDetailViewId && this.renderChallengeDetailView()}
      // </LayoutAppBox>
      <div>
        <LayoutHome centerPanelContent={centerContent} showLines={true}/>
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
