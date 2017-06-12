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
import {uniqBy} from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'

class ChallengeList extends Component {

  state = {formVisible:false}

  toggleForm = () => {
    this.setState({formVisible: !this.state.formVisible})
  }
  //so can change query variables in one place and pass to child components:
  allChallengesQueryVariables = {"filter":{ "id": this.props.apiUserId}}

  handleCreateChallengeSubmit = async (values) =>{
    const {title, description} = values
    const options = {
      variables: {
        title,
        description,
        "filter":{ "id": this.props.apiUserId}
      },
      update: (proxy, { data: {createChallenge} }) => {
        const data = proxy.readQuery({
          query: allChallengesQuery,
          variables: this.allChallengesQueryVariables
        })
        data.allChallenges.push(createChallenge)
        proxy.writeQuery({
          query:allChallengesQuery,
          variables: this.allChallengesQueryVariables,
          data
        })
      },
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

    const challengeCards = this.props.allChallenges.map(challenge =>{
      return(
        <Col key={'challengelist'+challenge.id} xs={12} lg={6} >
          <ChallengeCard
            challenge={challenge}
            apiUserId={this.props.apiUserId}
            isAuthenticated={this.props.isAuthenticated}
            allChallengesQueryVariables={this.allChallengesQueryVariables}
          />
        </Col>
      )
    })

    return(
        <InfiniteScroll
          pageStart={0}
          hasMore={this.props.cursor.length === 0 ? false : true}
          loader={<div className="loader">Loading ...</div>}
          next={()=>this.props.loadMoreEntries()}
         >
          <Col xsOffset={1} xs={10} lgOffset={3} lg={7}>
            <Row>
            {challengeCards}
            </Row>
            <RaisedButton label="Add a new challenge" primary={true}
                onClick={()=> requireAuth(this.toggleForm)}>
            </RaisedButton>
            { this.state.formVisible && <ChallengeCreateForm onSubmit={this.handleCreateChallengeSubmit} /> }
          </Col>
        </InfiniteScroll>

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

      props: ({ ownProps, data: { loading, allChallenges, cursor, fetchMore}}) => ({
        loading,
        allChallenges,
        cursor,
        loadMoreEntries: () => {
          return fetchMore({
            query: moreChallengesQuery,
            variables: {
              filter:{
                id: ownProps.apiUserId ? ownProps.apiUserId : '',
              },
              cursor: cursor[0].id,
              querySize: 3,
            },
            updateQuery: ( previousResult, { fetchMoreResult }) => {
              const previousChallenges = previousResult.allChallenges
              const newChallenges = fetchMoreResult.allChallenges
              //prevents adding duplicate when query overlaps with previously
              // manually added entry in apollo cache ( using update).
              const allChallenges = uniqBy(
                [...previousChallenges, ...newChallenges],
                'id'
              )
              return {
                allChallenges,
                cursor: fetchMoreResult.cursor
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
        },
        fetchPolicy: 'network-only',
      }),
    },
  ),

  graphql(createChallengeMutation, {name:"createChallengeMutation"}),
)(ChallengeList)

export default connect(mapStateToProps)(ChallengeListApollo)
