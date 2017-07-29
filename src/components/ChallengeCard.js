//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  hideUpdateChallengeView,
  showUpdateChallengeView,
  showChallengeDetailView,
} from '../actions/challenge-actions'
import {hideScreen} from '../actions/layout-actions'
//gql
import {compose,graphql} from 'react-apollo'
import {
  DELETE_CHALLENGE_MUTATION,
  UPDATE_CHALLENGE_MUTATION,
} from '../gql/Challenge/mutations'
import {ALL_CHALLENGES_QUERY} from '../gql/Challenge/queries'
//helpers+other
import {requireAuth} from '../lib/auth'
import {logException} from '../config'
//components+styles
import ChallengeUpdateForm from './ChallengeUpdateForm'
import ChallengeUpvote from './ChallengeUpvote'
import DialogOverlay from './DialogOverlay'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Update from 'material-ui/svg-icons/content/create'
import FlatButton from 'material-ui/FlatButton'


class ChallengeCard extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
    apiUserId: PropTypes.string,
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
    try{
      await updateChallengeMutation(options)
    }
    catch(err){
      logException(err, {action: 'handleUpdateChallengeSubmit in ChallengeCard.js'})
    }
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
          query: ALL_CHALLENGES_QUERY,
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
            query:ALL_CHALLENGES_QUERY,
            variables: allChallengesQueryVariables,
            data })
        }
      },
    }
    this.setState({deleteInProgress: true})
    try{
      await deleteChallengeMutation(options)
    }
    catch(err){
      logException(err, {action: 'handleDeleteChallenge in ChallengeCard.js'})
      this.setState({deleteInProgress: false})
    }
  }

  toggleUpdateForm = () => {
    this.setState({updateFormVisible: !this.state.updateFormVisible})
  }

  renderUpdateFormModal = () => {
    const {id, title, description} = this.props.challenge
      return(
      <DialogOverlay
        title="Update Challenge"
        isOpen
        handleClose={this.props.hideUpdateChallengeView}
        modal={true}
      >
        <ChallengeUpdateForm
          form={`challengeUpdateForm${id}`}
          initialValues={{title, description}}
          onSubmit={this.handleUpdateChallengeSubmit}
        />
      </DialogOverlay>
      )
  }

  showDetail = () => {
    this.props.hideScreen()
    this.props.showChallengeDetailView(this.props.id)
  }

  render(){
    const {title, description, id, userDidUpvote} = this.props.challenge
    const upvotesCount = this.props.challenge._upvotesMeta.count
    const {
      apiUserId,
      showUpdateChallengeView,
      showChallengeDetailView
    } = this.props
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
          <div style={{position:'relative', left:8}}>
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
            <FlatButton
              onTouchTap={this.showDetail}
              label="Show"
              primary={true}
            />
          </div>
          {this.props.openUpdateViewId === id && this.renderUpdateFormModal()}
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
    hideUpdateChallengeView,
    showChallengeDetailView,
    hideScreen,
  }, dispatch)
}

const ChallengeCardApollo = compose(
  graphql(UPDATE_CHALLENGE_MUTATION, {name: "updateChallengeMutation"}),
  graphql(DELETE_CHALLENGE_MUTATION, {name: "deleteChallengeMutation"}),
)(ChallengeCard)

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCardApollo)
