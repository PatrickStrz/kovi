import React,{Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {connect} from 'react-redux'
import {Row, Col} from 'react-flexbox-grid'
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
      variables: {title, description}, refetchQueries: [{
        query: allChallengesQuery,
        variables: {"filter": {id: this.props.apiUserId}}
      }]
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
        <Row>
          <Col xsOffset={1} xs={10} lgOffset={3} lg={7}>
          <Row>
          {this.props.data.allChallenges.map(challenge =>(
            <Col key={'challengelist'+challenge.id} xs={12} lg={6} >
              <ChallengeCard
                challenge={challenge}
                apiUserId={this.props.apiUserId}
                isAuthenticated={this.props.isAuthenticated}
              />
            </Col>

          ))}
          </Row>


        <RaisedButton label="Add a new challenge" primary={true}
            onClick={()=> requireAuth(this.toggleForm)}>
        </RaisedButton>
        { this.state.formVisible && <ChallengeCreateForm onSubmit={this.handleCreateChallengeSubmit} /> }
        </Col>
      </Row>
      </div>
      )
    }
  }

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
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
