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
import {requireAuth} from 'lib/auth'
import styled from 'styled-components'
//Components
import ChallengeListContainer from 'components/challenges/ChallengeListContainer'
import ChallengeFormContainer from 'components/challenges/ChallengeFormContainer'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import HomeLayout from 'components/layouts/HomeLayout'
import Community from 'components/community/Community'
import ChallengeDetailContainer from 'components/challenges/ChallengeDetailContainer'
import {Route, Link} from 'react-router-dom'
import BottomBar from 'components/BottomBar'
import Transition from 'react-transition-group/Transition'
import {Dialog, Banner, Animate} from 'ui-kit'

const ChallengeListBox = styled.div`
  margin-top: 45px;
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

  state = {
    showBanner: true
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

  handleCloseBanner = () => {
    this.setState({showBanner: false})
  }

  renderBanner = () => {
    return(
      <Banner
        text={<div>Welcome to <b> Kovi </b> -
        the platform for moving tech forward in a
        direction that benefits humanity.
        <br/>
        We are a work in progress, but moving quickly.
        <Link to="/features"><div>Check out some cool features we built</div></Link>
      </div>}
        onExitClick={this.handleCloseBanner}
      />
    )
  }

  render(){
    const {showCreateChallengeView} = this.props

    const centerContent = (

      <ChallengeListBox>
        {/* {this.state.showBanner && this.renderBanner()} */}
        <Animate cheese="cheeesy" inProp={this.state.showBanner && true} child={this.renderBanner()}/>
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
        <BottomBar />
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
