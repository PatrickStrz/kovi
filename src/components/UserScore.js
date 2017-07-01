import React,{Component} from 'react'

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
      id: "cj4h3bqcawi170155j6btqg1i"
    },
    fetchPolicy: 'network-only',
  }),
  // {name: "updateChallengeMutation"}
}
)(UserScore)

export default UserScoreWithData
