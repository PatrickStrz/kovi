import React,{Component} from 'react'
import {compose,graphql} from 'react-apollo'
import {
  deleteChallengeMutation,
  updateChallengeMutation,
} from '../mutations/challenge-mutations'
import {requireAuth} from '../lib/auth'
import ChallengeUpdateForm from './ChallengeUpdateForm'
import {allChallengesQuery} from '../queries/challenge-queries'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import ChallengeUpvote from './ChallengeUpvote'

class ChallengeCard extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
    apiUserId: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    allChallengesQueryVariables: PropTypes.object.isRequired,
  }

  state = {
    updateFormVisible: false,
    updateInProgress: false,
    deleteInProgress: false,
  }

  styles = {
    card: {
      borderRadius: 5
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

  userDidUpvote = this.props.challenge.userDidUpvote.length > 0  ? true : false

  handleUpdateChallengeSubmit = async (values) =>{
    const { updateChallengeMutation, apiUserId} = this.props
    const {title, description} = values // values coming from redux form after submit
    const options = {
      variables: {
        id: this.props.challenge.id,
        title,
        description,
        "filter": {id: apiUserId}
      }
    }
    this.setState({updateInProgress: true})
    await updateChallengeMutation(options)
    this.setState({updateFormVisible: false, updateInProgress: false})
  }

  handleDeleteChallenge = async () => {
    const {allChallengesQueryVariables, deleteChallengeMutation} = this.props
    const options = {
      variables: {id: this.props.challenge.id},
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
    if(this.state.updateFormVisible){
      return(
        <ChallengeUpdateForm
          form={`challengeUpdateForm${id}`}
          initialValues={{title, description}}
          onSubmit={this.handleUpdateChallengeSubmit}
        />
      )
    }
  }

  render(){
    const {title, description, id} = this.props.challenge
    const upvotesCount = this.props.challenge._upvotesMeta.count

    return(
      <div>
        <ChallengeUpvote
          userDidUpvote={this.props.challenge.userDidUpvote}
          apiUserId={this.props.apiUserId}
          challengeId={id}
          upvotesCount={upvotesCount}
        />
        <Card zDepth={4} style={this.cardStyle()}>
          <CardHeader
            title={title}
            subtitle={description}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
            <FlatButton
              label="Delete"
              onClick={()=> requireAuth(this.handleDeleteChallenge)}
              secondary={true}
              disabled={this.state.deleteInProgress}
            />
            <FlatButton
              label={this.state.updateFormVisible ? "Hide Form" : "Update"}
              onClick={()=> requireAuth(this.toggleUpdateForm)}
              primary={true}
            />
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          {this.renderUpdateForm()}
        </Card>
      <br/>
      </div>
    )
  }
}

const ChallengeCardApollo = compose(
  graphql(updateChallengeMutation, {name: "updateChallengeMutation"}),
  graphql(deleteChallengeMutation, {name: "deleteChallengeMutation"}),
)(ChallengeCard)

export default ChallengeCardApollo
