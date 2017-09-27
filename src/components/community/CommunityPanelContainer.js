import React, {Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {TOP_SCORERS_QUERY} from 'gql/Scorecard/queries'
import {graphql} from 'react-apollo'
//other
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
import {logException} from 'config'
//components
import Leaderboard from 'components/community/Leaderboard'

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
    const {data} = this.props

    if (data.loading) {
      return(<div>Loading</div>)
    }

    else if (data.error) {
      logException(data.error, {
      action: "query in CommunityPanel"
      })
      return <div></div>
    }

    const {allScorecards} = data

    return(
    <div>
      <Box>
        <Title>Leaderboard</Title>
        <Leaderboard scorecards={allScorecards}/>
      </Box>
    </div>
    )
  }
}

const CommunityPanelContainerApollo = graphql(TOP_SCORERS_QUERY)(CommunityPanelContainer)

export default CommunityPanelContainerApollo
