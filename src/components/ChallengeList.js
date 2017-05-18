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
    const mutationParams = {
      variables:{title, description}, refetchQueries:[{ query: allChallengesQuery,variables: {
        "filter": this.props.auth0IdToken
      }, }]
    }
    await this.props.createChallengeMutation(mutationParams)
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
        <h1>isAuthed:{this.props.isAuthenticated ? 'true' : 'not authed'}</h1>
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
    profile: state.auth.profile,
    auth0IdToken: state.auth.auth0IdToken
  }
}

// const queryConfig =
//   ({auth0IdToken})=>({
//     variables: {
//       "filter": auth0IdToken
//     },
//     options: {
//       fetchPolicy: 'network-only'
//     },
//   })

const queryConfig =
  ({auth0IdToken})=>({
    variables: {
      "filter": auth0IdToken
    },
    options: {
      fetchPolicy: 'network-only'
    },
  })


const ChallengeListApollo = compose(
  graphql(
    allChallengesQuery, {
      options: {
        fetchPolicy: 'network-only',
        variables: {
          "filter": "facebook|10154990636666251"
        },
      },
    }),
  graphql(createChallengeMutation, {name:"createChallengeMutation"}),
)(ChallengeList)


export default connect(mapStateToProps,null)(ChallengeListApollo)
