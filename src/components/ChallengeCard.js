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
    isAuthenticated: PropTypes.bool.isRequired
  }

  state = {
    updateFormVisible: false,
    updateInProgress: false,
    deleteInProgress: false,
    disableDeleteChallenge: false,
  }

  styles = {
    card:{
      borderRadius:5
    }
  }

  cardStyle = () => {
    if (this.state.updateInProgress){
        return {...this.styles.card, opacity:0.5}
    }
    else if (this.state.deleteInProgress) {
      return {...this.styles.card, backgroundColor:'#d53b3b'}
    }
    else{
      return this.styles.card
    }
  }

  id = this.props.challenge.id

  allChallengesQueryVariables = {"filter": {id: this.props.apiUserId}}

  userDidUpvote = this.props.challenge.userDidUpvote.length > 0  ? true : false

  handleUpdateChallengeSubmit = async (values) =>{
    const {title, description} = values // values coming from redux form after submit
    const options = {
      variables: { id: this.id, title, description},
      refetchQueries: [{
        query: allChallengesQuery,
        variables: this.allChallengesQueryVariables
      }]
    }

    this.setState({updateInProgress: true})
    await this.props.updateChallengeMutation(options)
    this.setState({updateFormVisible: false, updateInProgress: false})
  }

  handleDeleteChallenge = async () => {

    const options = {
      variables:{id: this.id}, refetchQueries:[{
        query: allChallengesQuery,
        variables: this.allChallengesQueryVariables
      }]
    }

    this.setState({deleteInProgress: true, disableDeleteChallenge: true})
    await this.props.deleteChallengeMutation(options)
    this.setState({deleteInProgress: false, disableDeleteChallenge: false})
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
    <div className="grid-center">
      <div className="col-8_sm-10">
        <ChallengeUpvote
          // userDidUpvote2={this.props.challenge.userDidUpvote}
          userDidUpvote={this.props.challenge.userDidUpvote}
          apiUserId={this.props.apiUserId}
          challengeId={id}
          allChallengesQueryVariables={this.allChallengesQueryVariables}
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
              disabled={this.state.disableDeleteChallenge}
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
    </div>
    )
  }
}

const ChallengeCardApollo = compose(
  graphql(updateChallengeMutation, {name:"updateChallengeMutation"}),
  graphql(deleteChallengeMutation, {name:"deleteChallengeMutation"}),
)(ChallengeCard)

export default ChallengeCardApollo
