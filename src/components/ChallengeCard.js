import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  hideUpdateChallengeView,
  showUpdateChallengeView
} from '../actions/challenge-actions'

import {compose,graphql} from 'react-apollo'
import {
  deleteChallengeMutation,
  updateChallengeMutation,
} from '../mutations/challenge-mutations'

import {requireAuth} from '../lib/auth'
import ChallengeUpdateForm from './ChallengeUpdateForm'
import {allChallengesQuery} from '../queries/challenge-queries'

import ChallengeUpvote from './ChallengeUpvote'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Update from 'material-ui/svg-icons/content/create'
import Modal from './Modal'

class ChallengeCard extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
    apiUserId: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    allChallengesQueryVariables: PropTypes.object.isRequired,
  }

  state = {
    updateInProgress: false,
    deleteInProgress: false,
  }

  styles = {
    card: {
      marginBottom:5
    },
    actionButtonStyle:{
      color:'#adadad'
    }
  }

  cardStyle = () => {
    if (this.state.updateInProgress){
        return {...this.styles.card, opacity: 0.5}
    }
    else if (this.state.deleteInProgress) {
      return {...this.styles.card, backgroundColor: '#d53b3b'}
    }
    else{
      return this.styles.card
    }
  }

  handleUpdateChallengeSubmit = async (values) =>{
    const {
      updateChallengeMutation,
      apiUserId,
      challenge,
      hideUpdateChallengeView
    } = this.props
    const {title, description} = values // values coming from redux form after submit
    const options = {
      variables: {
        id: challenge.id,
        title,
        description,
        "filter": {id: apiUserId}
      }
    }
    this.setState({updateInProgress: true})
    await updateChallengeMutation(options)
    this.setState({updateInProgress: false})
    hideUpdateChallengeView()
  }

  handleDeleteChallenge = async () => {
    const {
      allChallengesQueryVariables,
      deleteChallengeMutation,
      challenge
    } = this.props

    const options = {
      variables: {id: challenge.id},
      update: (proxy, { data: {deleteChallenge} }) => {
        const data = proxy.readQuery({
          query: allChallengesQuery,
          variables: allChallengesQueryVariables
        })

        const filter = (challenge) => challenge.id === deleteChallenge.id
        const index = data.allChallenges.findIndex(filter)

        if(index !== -1){
          data.allChallenges.splice(index,1)
          //id of the last item of the query is the cursor, if delete last item need
          //to change the cursor to the id of the second last item of the query
          if(data.cursor.length > 0 && data.cursor[0].id === deleteChallenge.id){
            const newCursor = data.allChallenges[index - 1].id
            data.cursor[0].id = newCursor
          }
          proxy.writeQuery({
            query:allChallengesQuery,
            variables: allChallengesQueryVariables,
            data })
        }
      },
    }
    this.setState({deleteInProgress: true})
    await deleteChallengeMutation(options)
    // todo: if error deleting setState --> this.setState({deleteInProgress: false})
  }

  toggleUpdateForm = () => {
    this.setState({updateFormVisible: !this.state.updateFormVisible})
  }

  renderUpdateForm = () => {
    const {id, title, description} = this.props.challenge
      return(
      <Modal
        title="Update Challenge"
        isOpen
        handleClose={this.props.hideUpdateChallengeView}
      >
        <ChallengeUpdateForm
          form={`challengeUpdateForm${id}`}
          initialValues={{title, description}}
          onSubmit={this.handleUpdateChallengeSubmit}
        />
      </Modal>
      )
  }

  render(){
    const {title, description, id, userDidUpvote} = this.props.challenge
    const upvotesCount = this.props.challenge._upvotesMeta.count
    const {apiUserId, showUpdateChallengeView} = this.props
    const showUpdateChallengeViewCb = () => showUpdateChallengeView(id)

    return(
      <div>
        <Card style={this.cardStyle()}>
          <CardHeader
            title={title}
            subtitle={description}
          />
          <CardText >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <ChallengeUpvote
              userDidUpvote={userDidUpvote}
              apiUserId={apiUserId}
              challengeId={id}
              upvotesCount={upvotesCount}
              style={{paddingBottom:0}}
            />
            <IconButton
              onClick={()=> requireAuth(this.handleDeleteChallenge)}
              iconStyle={this.styles.actionButtonStyle}
            >
              <Delete />
            </IconButton>
            <IconButton
              onClick={()=> requireAuth(showUpdateChallengeViewCb)}
              iconStyle={this.styles.actionButtonStyle}
            >
              <Update/>
            </IconButton>
          </CardActions>
          {this.props.openUpdateViewId === id && this.renderUpdateForm() }
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  openUpdateViewId: state.app.challenges.openUpdateViewId
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showUpdateChallengeView,
    hideUpdateChallengeView
  }, dispatch)
}

const ChallengeCardApollo = compose(
  graphql(updateChallengeMutation, {name: "updateChallengeMutation"}),
  graphql(deleteChallengeMutation, {name: "deleteChallengeMutation"}),
)(ChallengeCard)

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCardApollo)
