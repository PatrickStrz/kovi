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
import {levels} from '../../gql/Score/score-system'
import {COMMUNITY_SCORE_COUNTS_QUERY} from '../../gql/Score/queries'
import {SCORE_CREATED_SUBSCRIPTION} from '../../gql/Score/subscriptions'
//other
import {logException} from 'config'
import {muiColors} from 'styles/theme/colors'
import {bounceInKeyframes} from 'styles/animations/keyframes'

const Score = styled.p`
  display: inline-block;
  color: ${muiColors.primary1};
  font-size: 18px;
  margin: 0px;
  animation: ${bounceInKeyframes} 0.5s;
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
       const communityScore = this.getTotalCommunityScore(nextProps.data)
       this.props.initializeCommunityScore(communityScore)
     }
   }

    //this total is calculated based on the scoring system in score-system.js:
  getTotalCommunityScore = (data) => {
    const level1Count = data[levels.one.name].count
    const level2Count = data[levels.two.name].count
    const level3Count = data[levels.three.name].count

    const level1Value = levels.one.value
    const level2Value = levels.two.value
    const level3Value = levels.three.value

    const CommunityTotal = (
      level1Count*level1Value +
      level2Count*level2Value +
      level3Count*level3Value
    )
    return(CommunityTotal)
  }

  renderScore = () => {
      return <Score>{this.props.communityScore} points</Score>
  }

  render(){
    const {data, animation1, animation2} = this.props

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
      <div>
        {animation1 && this.renderScore()}
        {animation2 && this.renderScore()}
      </div>
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
            //get console errors for missing fields since this is a different query
            if (!subscriptionData.data) {
                return prev;
            }
            const {value, id} = subscriptionData.data.Score.node
            ownProps.updateCommunityScore(value, id)
            return {
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
    animation1: state.app.scores.animation1,
    animation2: state.app.scores.animation2,
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      initializeCommunityScore,
      updateCommunityScore,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScoreWithData)
