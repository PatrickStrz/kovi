import React,{Component} from 'react'
import ChallengeList from './ChallengeList'
import {gql, graphql} from 'react-apollo'

class Home extends Component{

  render(){
    return(
      <div>
        <br/>
        <br />
        <ChallengeList />
      </div>
    )
  }
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }`

const HomeWithData = graphql(userQuery, { options: {fetchPolicy: 'network-only' }})(Home)

export default HomeWithData
