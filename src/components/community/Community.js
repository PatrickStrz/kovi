import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {resetLastContributor} from 'actions/score-actions'
import {bindActionCreators} from 'redux'
//other
import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'
//components
import TasksContainer from 'components/tasks/TasksContainer'
import CommunityScore from 'components/scoreboard/CommunityScore'
import {AvatarPop, ProgressMeter} from 'ui-kit'
import {SCORE_SECTION_SHADOW} from 'styles/shadows'

const Header = styled.p`
  color: ${muiColors.secondary1};
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-size: 20px;
  margin: auto;
`

const HeadingBox = styled.div`
  background-color: ${muiColors.secondary1};
  background-color: #bff9f7;  ${''/* margin: 5px; */}
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`
const ScoreSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 3px;
  margin: 15px;
  padding-left: 15px;
  padding-right: 15px;
  ${SCORE_SECTION_SHADOW}
`
const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`
const AvatarPopBox = styled.div`
  margin-left: 5px;
`

class Community extends Component {
  static propTypes = {
    //redux
    userPictureUrl: PropTypes.string.isRequired,
    communityScoreEventId: PropTypes.string.isRequired,
  }

  onHideAvatarPop = () => {
    this.props.resetLastContributor()
  }

  render(){
    const {userPictureUrl, communityScoreEventId} = this.props
    return(
      <div>
        <HeadingBox>
          <Header>Community</Header>
          <ScoreSection>
            <ScoreBox>
              <CommunityScore />
              <AvatarPopBox>
                <AvatarPop
                  userPictureUrl={userPictureUrl}
                  uniqueEventId={communityScoreEventId}
                  onHide={this.onHideAvatarPop}
                />
              </AvatarPopBox>
            </ScoreBox>
            <ProgressMeter />
          </ScoreSection>
        </HeadingBox>
        <TasksContainer />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      resetLastContributor,
    }, dispatch)
}

const mapStateToProps = (state) => ({
  userPictureUrl: state.app.scores.lastContributor.pictureUrl,
  communityScoreEventId: state.app.scores.communityScoreEventId
})

export default connect(mapStateToProps, mapDispatchToProps)(Community)
