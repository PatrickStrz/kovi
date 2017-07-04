import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {graphql} from 'react-apollo'
import {USER_SCORECARD_QUERY} from '../gql/Scorecard/queries'
import {UPDATE_USER_SCORECARD_SUBSCRIPTION} from '../gql/Scorecard/subscriptions'

import {muiColors} from '../lib/theme/colors'

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
      <h2 style={{position:'relative',textAlign:'centre',color:muiColors.primary1}}>
        UserScore:{this.props.data.Scorecard.total}
      </h2>
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
          variables: {id: props.apiUserScorecardId},
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
