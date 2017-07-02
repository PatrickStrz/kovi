import React,{Component} from 'react'
import {connect} from 'react-redux'

import {graphql} from 'react-apollo'
import {userScoreCardQuery} from '../gql/scorecard/queries'

class UserScore extends Component {
  render(){
    if (this.props.data.loading){
      return(<h2>loading...</h2>)
    }
    return(
      <h1>Score:{this.props.data.Scorecard.total}</h1>
    )
  }
}

const UserScoreWithData = graphql(
  userScoreCardQuery,{
  options: (ownProps)=>({
    variables: {
      id: ownProps.apiUserScorecardId,
    },
    fetchPolicy: 'network-only',
    name: "userScoreCardQuery",
  }),
}
)(UserScore)

const mapStateToProps = (state) => {
  return {
    apiUserScorecardId: state.app.auth.apiUserScorecardId,
  }
}

export default connect(mapStateToProps)(UserScoreWithData)
