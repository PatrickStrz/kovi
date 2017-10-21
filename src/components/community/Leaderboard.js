import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {calculateTotalScore} from 'lib/score-system'
//other
import {muiColors, colors} from 'styles/theme/colors'
//components
import {Avatar, Popover} from 'ui-kit'
import {FaIcon} from 'ui-kit/icons'
import ProfileCardContainer from 'components/ProfileCardContainer'

class Leaderboard extends Component {
  static propTypes = {
    scorecards: PropTypes.array.isRequired,
  }
  renderScores = () => {
    return(
      this.props.scorecards.map(scorecard => {
        const {picture, name} = scorecard.user
        return (
          <Popover
            key={'Leaderboard'+scorecard.id}
            renderedInDrawer={true} // adjusts z-index value
            body={<ProfileCardContainer userId={scorecard.user.id} />}
          >
            <ScorecardBox>
              <Avatar imageUrl={picture} size="30px"/>
              <Name>{name}</Name>
              <ScoreBox>
                {calculateTotalScore(scorecard)}
              </ScoreBox>
              <IconBox>
                <FaIcon
                  inline={true}
                  faClassName="fa-star-o"
                  color={colors.medGrey}
                />
              </IconBox>
            </ScorecardBox>
          </Popover>
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
  padding-top: 5px;
  padding-bottom: 5px;
  :hover{
    background-color: #e0dddd;
    border-radius: 20px;
    padding-right: 5px;
  };
`
const Name = styled.div`
  margin: 5px;
  color: ${muiColors.primary1}
`
const ScoreBox = styled.div`
  color: ${colors.medGrey};
  margin-right: 5px;
`
const IconBox = styled.div`
  display: inline-block;
`

export default Leaderboard
