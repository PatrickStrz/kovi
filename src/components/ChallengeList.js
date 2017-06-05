import React,{Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {connect} from 'react-redux'
import {Row, Col} from 'react-flexbox-grid'
import ChallengeCard from './ChallengeCard'
import {allChallengesQuery, moreChallengesQuery} from '../queries/challenge-queries'
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
    if (this.props.loading){
      return(<div>
        <h1 style={{color:"#002984"}}>Loading...</h1>
      </div>)
    }
    // alert('nolonger loafing')
    const {allChallenges} = this.props
    const cursor = allChallenges[allChallenges.length - 1].id

    return(
      <Col xsOffset={1} xs={10} lgOffset={3} lg={7}>
          <Row>
            {this.props.allChallenges.map(challenge =>(
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
        <RaisedButton label="Load more" primary={true}
            onClick={()=> this.props.loadMoreEntries(cursor)}>
        </RaisedButton>
      </Col>
      )
    }
  }

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    apiUserId: state.auth.apiUserId,
  }
}

const querySize = 5

const ChallengeListApollo = compose(
  graphql(
    allChallengesQuery, {

      props: ({ ownProps, data: { loading, allChallenges, fetchMore}}) => ({

        loading,
        allChallenges,
        loadMoreEntries: (cursor) => {
          return fetchMore({
            query: moreChallengesQuery,
            variables: {
              filter:{
                id: ownProps.apiUserId ? ownProps.apiUserId : '',
              },
              cursor,
              querySize: 3,
            },
            updateQuery: ( previousResult, { fetchMoreResult }) => {
              const previousEntry = previousResult
              const newChallenges = fetchMoreResult.allChallenges
              return {
                allChallenges: [...previousEntry.allChallenges, ...newChallenges],
              }
            },
          })
        },

    }),
    //original query
      options: (ownProps)=>({
        variables: {
          filter:{
            id: ownProps.apiUserId ? ownProps.apiUserId : '',
          },
          querySize
        },
        fetchPolicy: 'network-only',
      }),
    },
  ),

  graphql(createChallengeMutation, {name:"createChallengeMutation"}),
)(ChallengeList)

export default connect(mapStateToProps)(ChallengeListApollo)
