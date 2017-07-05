import React,{Component} from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'

import {graphql} from 'react-apollo'
import {levels} from '../gql/Score/score-system'
import {COMMUNITY_SCORE_COUNTS_QUERY} from '../gql/Score/queries'
import {SCORE_CREATED_SUBSCRIPTION} from '../gql/Score/subscriptions'

import {muiColors} from '../lib/theme/colors'

class CommunityScore extends Component {
  // static propTypes = {
  //   subscribeToScorecardUpdates: PropTypes.func.isRequired,
  //   apiUserScorecardId: PropTypes.string,
  // }
  componentWillMount() {
       this.props.subscribeToNewScores()
   }

    //this total is calculated based on the scoring system in score-system.js:
  getTotalCommunityScore = () => {
    const data = this.props.data
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



  render(){

    if (this.props.data.loading){
      return(<h2>loading...</h2>)
    }


    return(

      <h2 style={{position:'relative',textAlign:'centre',color:muiColors.primary1}}>
        CommunityScore:{this.getTotalCommunityScore()}
      </h2>
    )
  }
}

const CommunityScoreWithData = graphql(COMMUNITY_SCORE_COUNTS_QUERY,{
  options: (ownProps)=>({
    // variables: {
    //   id: ownProps.apiUserScorecardId,
    // },
    fetchPolicy: 'network-only',
  }),

  props: ({ownProps, data}) => {
    return {
      data,
      subscribeToNewScores: () => {
        // console.log('logging sub data:'+ subscriptionData.data.Score.node.value)
        return data.subscribeToMore({
          document: SCORE_CREATED_SUBSCRIPTION,
          updateQuery: (prev, {subscriptionData}) => {
            //get console errors for missing fields since this is a different query
            if (!subscriptionData.data) {
                return prev;
            }
            const newFeedItem = subscriptionData.data.Score.node.value
            console.log('score increased by:'+ newFeedItem)
            return {
                prev,
            }
          }
          // onError: (err) => console.error(err),
          // return{ console.log('logging sub data:'+ subscriptionData.data.Score.node.value)}
        })
      },
    }
  }
})(CommunityScore)

// const mapStateToProps = (state) => {
//   return {
//     apiUserScorecardId: state.app.auth.apiUserScorecardId,
//   }
// }

export default CommunityScoreWithData
// export default connect(mapStateToProps)(CommunityScoreWithData)
