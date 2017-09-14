import React,{Component} from 'react'
import PropTypes from 'prop-types'
// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  showCreateChallengeView,
  hideCreateChallengeView,
} from '../actions/challenge-actions'
//lib + other
import {requireAuth} from '../lib/auth'
import styled from 'styled-components'
//Components
import ChallengeListContainer from './ChallengeListContainer'
import ChallengeFormContainer from 'components/ChallengeFormContainer'
import Dialog from 'ui-kit/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import HomeLayout from 'components/layouts/HomeLayout'
import Community from 'components/community/Community'
import ChallengeDetailContainer from 'components/ChallengeDetailContainer'
import {Route} from 'react-router'
import {SelfDestruct} from 'ui-kit'

const ChallengeListBox = styled.div`
  margin-top: 70px;
  margin-bottom: 70px; /* so can see bottom of infinite scroll list */
`

const RightContent = styled.div`
  top:15vh;
  height:76vh;
  position:fixed;
  ${''/* background-color: #ffffff; */}
  width: 20vw;
  right:20px;
  border-radius: 3px;
  overflow-y:auto;
  ::-webkit-scrollbar {
    display: none;
  } /* hides scrollbar*/
  padding: 10px;
`
class Home extends Component {

  static propTypes = {
    //redux:
    showCreateChallengeView: PropTypes.func.isRequired,
    hideCreateChallengeView: PropTypes.func.isRequired,
    isCreateViewOpen: PropTypes.bool.isRequired,
  }

  styles = {
    actionButton:{
      position: 'fixed',
      right: '3vw',
      bottom: '6vh',
      backgroundColor:'#38c1be',
      zIndex:200
    }
  }

  handleCreateChallengeClose = () => {
    this.props.hideCreateChallengeView()
  }

  render(){
    const {showCreateChallengeView} = this.props

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
            <RightContent>
              <Community/>
            </RightContent>}
            // leftPanelContent={<SelfDestruct
            //   enterAnimationDuration={500}
            //   stayDuration={3000}
            //   exitAnimationDuration={1000}
            // ><h1>yoooooooooo! self dest</h1></SelfDestruct>}
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
        <Dialog
          isOpen={this.props.isCreateViewOpen}
          handleClose={this.handleCreateChallengeClose}
          title='Create A Challenge'
          modal={true}
        >
          <ChallengeFormContainer
            update={false}
          />
        </Dialog>
        <Route path="/challenge/:id" component={ChallengeDetailContainer}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      showCreateChallengeView,
      hideCreateChallengeView,
    }, dispatch)
}

const mapStateToProps = (state) => ({
  isCreateViewOpen: state.app.challenges.isCreateViewOpen,
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
