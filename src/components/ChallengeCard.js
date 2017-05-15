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
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types'

class ChallengeCard extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
  }

  state = {
    updateFormVisible: false,
    updateInProgress: false,
    deleteInProgress: false,
  }

  styles = {
    card:{
      borderRadius:5
    }
  }

  id = this.props.challenge.id

  handleUpdateChallengeSubmit = async (values) =>{
    const {title, description} = values
    const mutationParams = {
      variables: { id: this.id, title, description},
      refetchQueries: [{ query: allChallengesQuery}]
    }

    this.setState({updateInProgress:true})
    await this.props.updateChallengeMutation(mutationParams)
    this.setState({updateInProgress:false})
  }

  handleDeleteChallenge = async () => {

    const mutationParams = {
      variables:{id: this.id}, refetchQueries:[{ query: allChallengesQuery}]
    }

    this.setState({deleteInProgress:true})
    await this.props.deleteChallengeMutation(mutationParams)
    this.setState({deleteInProgress:false})
  }

  toggleUpdateForm = () => {
    this.setState({updateFormVisible: !this.state.updateFormVisible})
  }

  showUpdateForm = () => {
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

  render(){
    const {title, description} = this.props.challenge

    return(
    <div className="grid-center">
      <div className="col-10_sm-12">
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
            />
            <FlatButton
              label="Update"
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
          {this.showUpdateForm()}
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
