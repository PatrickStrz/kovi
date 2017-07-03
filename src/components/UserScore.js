import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {graphql} from 'react-apollo'
import {USER_SCORECARD_QUERY} from '../gql/scorecard/queries'
import {UPDATE_USER_SCORECARD_SUBSCRIPTION} from '../gql/scorecard/subscriptions'

class UserScore extends Component {
  static propTypes = {
    subscribeToScorecardUpdates: PropTypes.func.isRequired,
    apiUserScorecardId: PropTypes.string,
  }
  componentWillMount() {
       this.props.subscribeToScorecardUpdates()
   }

  render(){
    if (this.props.data.loading){
      return(<h2>loading...</h2>)
    }
    return(
      <h1>Score:{this.props.data.Scorecard.total}</h1>
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
  props: props => {
    return {
      data: props.data,
      subscribeToScorecardUpdates: () => {
        return props.data.subscribeToMore({
          document: UPDATE_USER_SCORECARD_SUBSCRIPTION,
          variables: {id: "cj4is6f5v5m9r0158ji7iqr8a"},
          updateQuery: (prev, {subscriptionData}) => {
              if (!subscriptionData.data) {
                  return prev;
              }
              const newFeedItem = subscriptionData.data.Scorecard.node
              return {
                  Scorecard: newFeedItem
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
