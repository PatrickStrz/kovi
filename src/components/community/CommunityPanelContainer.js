import React, {Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {TOP_SCORERS_QUERY} from 'gql/Scorecard/queries'
import {graphql} from 'react-apollo'
//other
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
//components
import TopScorers from 'components/community/TopScorers'

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
const Title = styled.p`
  text-align: center;
  font-size: 20px;
  color: ${colors.lightGrey};
`

class CommunityPanelContainer extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allScorecards: PropTypes.array,
    })
  }
  render(){
    const {loading, data} = this.props.data
    if (loading) {
      return(<div>Loading</div>)
    }
    const {allScorecards} = this.props.data
    return(
    <div>
      <Box>
        <Title>Leaderboard</Title>
        <TopScorers scorecards={allScorecards}/>
      </Box>
    </div>
    )
  }
}

const CommunityPanelContainerApollo = graphql(TOP_SCORERS_QUERY)(CommunityPanelContainer)

export default CommunityPanelContainerApollo
