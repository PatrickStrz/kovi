//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
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

class CommunityScore extends Component {
  static propTypes = {
    subscribeToNewScores: PropTypes.func.isRequired,
    //redux
    initializeCommunityScore: PropTypes.func.isRequired,
    updateCommunityScore:  PropTypes.func.isRequired,
    communityScore: PropTypes.number,
    style: PropTypes.object.isRequired,
  }

  componentWillMount() {
       this.props.subscribeToNewScores()
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

  componentWillReceiveProps = (nextProps) => {
    if (this.props.data.loading && !nextProps.data.loading) {
      const communityScore = this.getTotalCommunityScore(nextProps.data)
      this.props.initializeCommunityScore(communityScore)
    }
  }

  render(){
    if (this.props.data.loading || !this.props.communityScore){
      return(<h2>loading...</h2>)
    }
    return(
      <span style={this.props.style}>
        {this.props.communityScore}
      </span>
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
            const newScore = subscriptionData.data.Score.node.value
            ownProps.updateCommunityScore(newScore)
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
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      initializeCommunityScore,
      updateCommunityScore,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScoreWithData)