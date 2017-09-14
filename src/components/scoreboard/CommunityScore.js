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
import {muiColors} from 'styles/theme/colors'
import {bounceIn} from 'styles/animations/keyframes'
import {calculateTotalScore} from 'lib/score-system'

const Score = styled.p`
  display: inline-block;
  color: ${muiColors.primary1};
  font-size: 18px;
  margin: 0px;
  animation: ${bounceIn} 0.5s;
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

  renderScore = () => {
      return <Score>{this.props.communityScore} points</Score>
  }

  render(){
    const {data, communityAnimation1, communityAnimation2} = this.props

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
        {communityAnimation1 && this.renderScore()}
        {communityAnimation2 && this.renderScore()}
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
