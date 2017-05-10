import React,{Component} from 'react'
import {graphql} from 'react-apollo'
import ChallengeCard from './ChallengeCard'
// import {gql} from 'graphql-tag'
import {allChallengesQuery} from '../queries/challenge-queries'

class ChallengeList extends Component {
  render(){

    if (this.props.data.loading){
      return(<div>
        <h1>Loading...</h1>
      </div>)
    }

    return(
        <div>
        {this.props.data.allChallenges.map(challenge =>(
          // <p key={challenge.id}>{challenge.title}</p>
          <div key={challenge.id}>
            <ChallengeCard challenge={challenge} />
          </div>
        ))}
        </div>
      )
    }
  }

const ChallengeListWithData = graphql(
  allChallengesQuery, {
    options: {
      fetchPolicy: 'network-only'
    },
  })(ChallengeList)

export default ChallengeListWithData
