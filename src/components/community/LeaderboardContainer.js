import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {refetchLeaderboardComplete} from 'actions/community-actions'
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

class LeaderboardContainer extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allScorecards: PropTypes.array,
    }).isRequired,
    //redux
    refetchLeaderboardComplete: PropTypes.func.isRequired,
    shouldRefetchLeaderboard: PropTypes.bool.isRequired,
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      shouldRefetchLeaderboard,
      refetchLeaderboardComplete,
      data
    } = this.props
    /*
    requestRefetchLeaderboard action creator is called from other components which
    sets the shouldRefetchLeaderboard state to true. If refetch is successful
    need to reset that piece of state to false.
    */

    if (nextProps.shouldRefetchLeaderboard && !shouldRefetchLeaderboard) {
      data.refetch() //refetches apollo query
    }

    else if (this.props.shouldRefetchLeaderboard){
      refetchLeaderboardComplete()
    }
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

const LeaderboardContainerApollo = graphql(TOP_SCORERS_QUERY)(LeaderboardContainer)

const mapStateToProps = (state) => {
  return {
    shouldRefetchLeaderboard: state.app.community.shouldRefetchLeaderboard
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      refetchLeaderboardComplete,
    }, dispatch)
}

export default connect(
    mapStateToProps
  , mapDispatchToProps)(LeaderboardContainerApollo)
