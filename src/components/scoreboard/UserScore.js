import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  initializeUserScore,
  updateUserScore,
} from '../../actions/score-actions'
//gql
import {graphql} from 'react-apollo'
import {USER_SCORECARD_QUERY} from '../../gql/Scorecard/queries'
import {USER_SCORE_CREATED_SUBSCRIPTION} from '../../gql/Score/subscriptions'
//other
import styled from 'styled-components'
import {logException} from '../../config'
import {muiColors} from 'styles/theme/colors'
import {bounceInKeyframes} from 'styles/animations/keyframes'

//components

const Score = styled.p`
  display: inline-block;
  color: ${muiColors.primary1};
  font-size: 18px;
  animation: ${bounceInKeyframes} 0.5s;
`

class UserScore extends Component {
  static propTypes = {
    subscribeToScorecardUpdates: PropTypes.func.isRequired, //apollo HOC
    scorecardId: PropTypes.string,
  }

  componentWillMount() {
       this.props.subscribeToScorecardUpdates()
   }

  componentWillReceiveProps = (nextProps) => {
    /* once component finishes loading data, inital score can be set
    using the value returned from the query
    */
    if (this.props.data.loading && !nextProps.data.loading) {
      const userScore = nextProps.data.Scorecard.total
      this.props.initializeUserScore(userScore)
    }
  }

  renderScore = () => {
    return(
      <Score>
        {this.props.userScore}
      </Score>
    )
  }
  render(){
    const {data, animation1, animation2} = this.props
    if (data.loading){
      return <div></div>
    }
    if (data.error){
      logException(this.props.data.error, {
      action: "UserScore query in UserScore.js"
      })
    }
    // to have a new render on score change to replay animation
    return(
      <div>
        {animation1 && this.renderScore()}
        {animation2 && this.renderScore()}
      </div>
    )
  }
}

const UserScoreWithData = graphql(USER_SCORECARD_QUERY,{
  options: (ownProps)=>({
    variables: {
      id: ownProps.scorecardId,
    },
    fetchPolicy: 'network-only',
  }),
  props: ({ownProps, data}) => {
    return {
      data,
      subscribeToScorecardUpdates: () => {
        return data.subscribeToMore({
          document: USER_SCORE_CREATED_SUBSCRIPTION,
          variables: {userScorecardId: ownProps.scorecardId},
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) {
                return prev
            }
            const {value,id} = subscriptionData.data.Score.node
            const scorecardId = subscriptionData.data.Score.node.scorecard.id
            /* even though filtering subscriptions by scorecard id, receiveing
            events that belong to other scorecards, correcting for this: */
            if (ownProps.scorecardId === scorecardId){
              ownProps.updateUserScore(value, id)
            }

            return {
                /* don't update apollo store using redux app store for
                scores */
                prev,
            }
          }
        })
      },
    }
  }
})(UserScore)

const mapStateToProps = (state) => {
  return {
    userScore: state.app.scores.userScore,
    animation1: state.app.scores.userAnimation1,
    animation2: state.app.scores.userAnimation2,
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      initializeUserScore,
      updateUserScore,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScoreWithData)
