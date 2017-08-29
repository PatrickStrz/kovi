//react+redux
import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {USER_SCORECARD_QUERY} from '../../gql/Scorecard/queries'
import {USER_SCORE_CREATED_SUBSCRIPTION} from '../../gql/Score/subscriptions'
//other
import {logException} from '../../config'

class UserScore extends Component {
  static propTypes = {
    subscribeToScorecardUpdates: PropTypes.func.isRequired,
    apiUserScorecardId: PropTypes.string,
    style: PropTypes.object.isRequired,
  }

  componentWillMount() {
       this.props.subscribeToScorecardUpdates()
   }

  render(){
    const {data} = this.props
    if (data.loading){
      return(<h2>loading...</h2>)
    }
    if (data.error){
      logException(this.props.data.error, {
      action: "UserScore query in UserScore.js"
      })
    }
    return(
      <span style={this.props.style}>
        {this.props.data.Scorecard.total}
      </span>
    )
  }
}

const UserScoreWithData = graphql(USER_SCORECARD_QUERY,{
  options: (ownProps)=>({
    variables: {
      id: ownProps.apiUserScorecardId,
    },
    fetchPolicy: 'network-only',
  }),
  props: ({ownProps, data}) => {
    return {
      data,
      subscribeToScorecardUpdates: () => {
        return data.subscribeToMore({
          document: USER_SCORE_CREATED_SUBSCRIPTION,
          variables: {id: ownProps.apiUserScorecardId},
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

const mapStateToProps = (state) => {
  return {
    apiUserScorecardId: state.app.auth.apiUserScorecardId,
  }
}

export default connect(mapStateToProps)(UserScoreWithData)
