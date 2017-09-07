import React,{Component} from 'react'
import PropTypes from 'prop-types'
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

  state = {
    animation1: true,
    animation2: false,
  }

  componentWillMount() {
       this.props.subscribeToScorecardUpdates()
   }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.data.Scorecard && nextProps.data.Scorecard){
      const score = this.props.data.Scorecard.total
      const newScore = nextProps.data.Scorecard.total
      const {animation1, animation2} = this.state
      if (score !== newScore) {
        this.setState({animation1:!animation1, animation2:!animation2})
      }
    }
  }

  renderScore = () => {
    return(
      <Score>
        {this.props.data.Scorecard.total}
      </Score>
    )
  }
  render(){
    const {data} = this.props
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
        {this.state.animation1 && this.renderScore()}
        {this.state.animation2 && this.renderScore()}
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
            const newScoreValue = subscriptionData.data.Score.node.value
            const newScorecardTotal = prev.Scorecard.total + newScoreValue
            const newScorecard = {...prev.Scorecard}
            newScorecard.total = newScorecardTotal
            return {
                Scorecard: newScorecard,
            }
          }
        })
      },
    }
  }
})(UserScore)

export default UserScoreWithData
