import React,{Component} from 'react'
import {graphql, compose} from 'react-apollo'
import ChallengeCard from './ChallengeCard'
// import {gql} from 'graphql-tag'
import {allChallengesQuery} from '../queries/challenge-queries'
import {deleteChallengeMutation} from '../mutations/challenge-mutations'
// import {authRequired} from '../lib/auth'

class ChallengeList extends Component {

  handleDeleteChallenge = async (id) => {
    const queryParams = {
      variables:{id:id}, refetchQueries:[{ query: allChallengesQuery}]
    }
    await this.props.deleteChallengeMutation(queryParams)
  }

  render(){
    if (this.props.data.loading){
      return(<div>
        <h1 style={{color:"#002984"}}>Loading...</h1>
      </div>)
    }

    return(
        <div>
        {this.props.data.allChallenges.map(challenge =>(
          // <p key={challenge.id}>{challenge.title}</p>
          <div key={challenge.id}>
            <ChallengeCard challenge={challenge}
              handleDelete={this.handleDeleteChallenge}
            />
          </div>
        ))}
        </div>
      )
    }
  }

// graphql(deleteChallengeMutation, {name:"deleteChallengeMutation"}),

const ChallengeListApollo = compose(
  graphql(
    allChallengesQuery, {
      options: {
        fetchPolicy: 'network-only'
      },
    }),
  graphql(deleteChallengeMutation, {name:"deleteChallengeMutation"})
)(ChallengeList)

export default ChallengeListApollo
