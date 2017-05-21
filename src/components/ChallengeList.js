import React,{Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {connect} from 'react-redux'
import ChallengeCard from './ChallengeCard'
import {allChallengesQuery} from '../queries/challenge-queries'
import {createChallengeMutation} from '../mutations/challenge-mutations'
import ChallengeCreateForm from './ChallengeCreateForm'
import {requireAuth} from '../lib/auth'
import RaisedButton from 'material-ui/RaisedButton'

class ChallengeList extends Component {

  state = {formVisible:false}

  toggleForm = () => {
    this.setState({formVisible: !this.state.formVisible})
  }

  handleCreateChallengeSubmit = async (values) =>{
    const {title, description} = values
    const options = {
      variables:{title, description}, refetchQueries:[{ query: allChallengesQuery}]
    }
    await this.props.createChallengeMutation(options)
    this.setState({formVisible:false})
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
          <div key={'challengelist'+challenge.id}>
            <ChallengeCard challenge={challenge}
            />
          </div>
        ))}
        <RaisedButton label="Add a new challenge" primary={true}
            onClick={()=> requireAuth(this.toggleForm)}>
        </RaisedButton>
        { this.state.formVisible && <ChallengeCreateForm onSubmit={this.handleCreateChallengeSubmit} /> }
      </div>
      )
    }
  }

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userSynced: state.auth.userSynced,
    profile: state.auth.profile,
    apiUserId: state.auth.apiUserId,
  }
}

const ChallengeListApollo = compose(
  graphql(
    allChallengesQuery, {
      options: (props)=>({
        variables: {
          filter:{
            id: props.apiUserId ? props.apiUserId : ''
          }
        },
        fetchPolicy: 'network-only'
      }),
    }),
  graphql(createChallengeMutation, {name:"createChallengeMutation"}),
)(ChallengeList)

export default connect(mapStateToProps)(ChallengeListApollo)
