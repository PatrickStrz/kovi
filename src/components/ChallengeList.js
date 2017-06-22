import React,{Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideCreateChallengeView } from '../actions/challenge-actions'

import {graphql, compose} from 'react-apollo'
import {allChallengesQuery, moreChallengesQuery} from '../queries/challenge-queries'
import {createChallengeMutation} from '../mutations/challenge-mutations'

// import {requireAuth} from '../lib/auth'
import {uniqBy} from 'lodash'

import ChallengeCard from './ChallengeCard'
import ChallengeCreateForm from './ChallengeCreateForm'
import {Row, Col} from 'react-flexbox-grid'
import InfiniteScroll from 'react-infinite-scroll-component'
import Modal from './Modal'

class ChallengeList extends Component {
  //so can change query variables in one place and pass to child components:
  getAllChallengesQueryVariables = () => ({"filter":{ "id": this.props.apiUserId}})

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
          variables: this.getAllChallengesQueryVariables()
        })
        data.allChallenges.push(createChallenge)
        proxy.writeQuery({
          query:allChallengesQuery,
          variables: this.getAllChallengesQueryVariables(),
          data
        })
      },
    }
    await this.props.createChallengeMutation(options)
    this.props.hideCreateChallengeView()
  }

  render(){
    if (this.props.loading){
      return(<div>
        <h1 style={{color:"#002984"}}>Loading...</h1>
      </div>)
    }

    const challengeCards = this.props.allChallenges.map(challenge =>{
      return(
        <Col key={'challengelist'+challenge.id} xs={12}>
          <ChallengeCard
            challenge={challenge}
            apiUserId={this.props.apiUserId}
            isAuthenticated={this.props.isAuthenticated}
            allChallengesQueryVariables={this.getAllChallengesQueryVariables()}
          />
        </Col>
      )
    })

    const createChallengeForm = (
      <ChallengeCreateForm onSubmit={this.handleCreateChallengeSubmit} />
    )

    return(
        <InfiniteScroll
          pageStart={0}
          hasMore={this.props.cursor.length === 0 ? false : true}
          loader={<div className="loader">Loading ...</div>}
          next={()=>this.props.loadMoreEntries()}
         >
          <Col xsOffset={1} xs={10} lgOffset={3} lg={6}>
            <Modal
              isOpen={this.props.isCreateViewOpen}
              handleClose={this.props.hideCreateChallengeView}
              title='Create A Challenge'
            >
              {createChallengeForm}
            </Modal>
            <Row>
            {challengeCards}
            </Row>
          </Col>
        </InfiniteScroll>
      )
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
    //query:
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.app.auth.isAuthenticated,
    apiUserId: state.app.auth.apiUserId,
    isCreateViewOpen: state.app.challenges.isCreateViewOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hideCreateChallengeView
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeListApollo)
