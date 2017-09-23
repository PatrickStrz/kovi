//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  initializeCommunityScore,
  updateCommunityScore,
} from '../../actions/score-actions'
//gql
import {graphql} from 'react-apollo'
import {COMMUNITY_SCORE_COUNTS_QUERY} from '../../gql/Score/queries'
import {SCORE_CREATED_SUBSCRIPTION} from '../../gql/Score/subscriptions'
//other
import {logException} from 'config'
import {colors, muiColors} from 'styles/theme/colors'
import {bounceIn} from 'styles/animations/keyframes'
import {calculateTotalScore, percentageOfGoal, remainingPoints} from 'lib/score-system'
import {ProgressMeter} from 'ui-kit'
import {FaIcon} from 'ui-kit/icons'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Score = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  color: ${muiColors.primary1};
  font-size: 18px;
  margin-left: 5px;
  animation: ${bounceIn} 0.5s;
`

const IconBox = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`

const RemainingPointsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items:center;
  color: ${colors.lightGrey}
`

class CommunityScore extends Component {
  static propTypes = {
    subscribeToNewScores: PropTypes.func.isRequired,
    //redux
    initializeCommunityScore: PropTypes.func.isRequired,
    updateCommunityScore:  PropTypes.func.isRequired,
    communityScore: PropTypes.number,
    animation1: PropTypes.bool,
    animation2: PropTypes.bool,
  }

  componentWillMount() {
       this.props.subscribeToNewScores()
   }

   componentWillReceiveProps = (nextProps) => {
     if (this.props.data.loading && !nextProps.data.loading) {
       const communityScore = calculateTotalScore(nextProps.data)
       this.props.initializeCommunityScore(communityScore)
     }
   }

    //this total is calculated based on the scoring system in lib/score-system:
  renderPointsIcon = () =>{
    return(
      <IconBox>
        <FaIcon faClassName='fa-star' size="20px" color=''/>
      </IconBox>
    )
    }

  renderScore = () => {
      return <Score>
        {this.renderPointsIcon()}
        {this.props.communityScore}
      </Score>
  }
  renderPointsToGo = () => {
    const {communityScore} = this.props
    return(
      <RemainingPointsBox>
        {remainingPoints(communityScore)} points to go !
      </RemainingPointsBox>
    )
  }

  render(){
    const {
      data,
      communityAnimation1,
      communityAnimation2,
      communityScore,
    } = this.props

    if (data.loading ){
      return(<div></div>)
    }
    if (data.error){
      logException(data.error, {
      action: "CommunityScore query in CommunityScore.js"
      })
      return <p>error</p>
    }
    //make sure score remounts on prop change so animation plays:
    return(
      <Box>
        <ProgressMeter percent={percentageOfGoal(communityScore)}/>
        {this.renderPointsToGo(communityScore)}
        {/* <p>{percentageOfGoal(communityScore)}% there</p> */}
          {communityAnimation1 && this.renderScore()}
          {communityAnimation2 && this.renderScore()}
      </Box>
    )
  }
}

const CommunityScoreWithData = graphql(COMMUNITY_SCORE_COUNTS_QUERY,{
  options: (ownProps)=>({
    fetchPolicy: 'network-only',
  }),

  props: ({ownProps, data}) => {
    return {
      data,
      subscribeToNewScores: () => {
        return data.subscribeToMore({
          document: SCORE_CREATED_SUBSCRIPTION,
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) {
                return prev
            }
            const {value, id, scorecard} = subscriptionData.data.Score.node
            ownProps.updateCommunityScore(
              value,
              id,
              scorecard.user.id,
              scorecard.user.picture,
            )

            return {
                /* don't update apollo store using redux app store for
                scores */
                prev,
            }
          }
          // onError: (err) => console.error(err),
        })
      },
    }
  }
})(CommunityScore)

const mapStateToProps = (state) => {
  return {
    communityScore: state.app.scores.communityScore,
    communityAnimation1: state.app.scores.communityAnimation1,
    communityAnimation2: state.app.scores.communityAnimation2,
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      initializeCommunityScore,
      updateCommunityScore,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScoreWithData)
