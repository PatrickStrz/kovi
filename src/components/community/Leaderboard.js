import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {calculateTotalScore} from 'lib/score-system'
//other
import {muiColors, colors} from 'styles/theme/colors'
//components
import {Avatar} from 'ui-kit'
import {FaIcon} from 'ui-kit/icons'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
const ScorecardBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
`
const Name = styled.div`
  margin: 5px;
  color: ${muiColors.primary1}
`
const ScoreBox = styled.div`
  color: ${colors.medGrey};
  margin-left: 5px;
`
const IconBox = styled.div`
  margin-left: 5px;
  display: inline-block;
`
class Leaderboard extends Component {
  static propTypes = {
    scorecards: PropTypes.array.isRequired,
  }
  renderScores = () => {
    return(
      this.props.scorecards.map(scorecard => {
        const {picture, name} = scorecard.user
        return (
          <ScorecardBox key={'Leaderboard'+scorecard.id}>
            <Avatar imageUrl={picture} size="30px"/>
            <Name>{name}</Name>
            <ScoreBox>
              {calculateTotalScore(scorecard)}
            <IconBox>
              <FaIcon
                inline={true}
                faClassName="fa-star-o"
                color={colors.medGrey}
              />
            </IconBox>
            </ScoreBox>
          </ScorecardBox>
        )
      })
    )
  }

  render(){
    return(
      <Box>
        {this.renderScores()}
      </Box>
    )
  }
}

export default Leaderboard
