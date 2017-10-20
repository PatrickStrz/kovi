import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {resetLastContributor} from 'actions/score-actions'
import {bindActionCreators} from 'redux'
//other
import styled, {css} from 'styled-components'
import {muiColors} from 'styles/theme/colors'
import {media} from 'styles/media-queries'
import {
  calculateTotalScore,
  percentageOfGoal,
  remainingPoints
} from 'lib/score-system'
//components
import CommunityScore from 'components/scoreboard/CommunityScore'
import {AvatarPop, ProgressMeter} from 'ui-kit'
import LeaderboardContainer from 'components/community/LeaderboardContainer'
import {FaIcon} from 'ui-kit/icons'

const HeadingBox = styled.div`
  background-color: ${muiColors.secondary1};
  background-color: #bff9f7;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

const Header = styled.p`
  color: ${muiColors.secondary1};
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-size: 20px;
  margin: auto;
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

const LeaderboardBox = styled.div`
  ${media.md`
    margin-left: 5px;
  `} /* indent on mobile */
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
    const {userPictureUrl, communityScoreEventId, communityScore} = this.props
    return(
      <div>
        <HeadingBox>
          <Header>
            {remainingPoints(communityScore)}
            <FaIcon faClassName="fa-star-o"
            color={muiColors.secondary1}
            inline={true}
            extraStyles={css`margin-left:3px;`}
          /> to go!
          </Header>
          <ScoreSection>
            <ProgressMeter percent={percentageOfGoal(communityScore)} />
          </ScoreSection>
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
        </HeadingBox>
        <LeaderboardBox>
          <LeaderboardContainer />
        </LeaderboardBox>
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
  communityScoreEventId: state.app.scores.communityScoreEventId,
  communityScore: state.app.scores.communityScore
})

export default connect(mapStateToProps, mapDispatchToProps)(Community)
