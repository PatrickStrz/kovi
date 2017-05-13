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
    await this.props.updateChallengeMutation(mutationParams)
  }

  handleDeleteChallenge = async () => {
    const mutationParams = {
      variables:{id: this.id}, refetchQueries:[{ query: allChallengesQuery}]
    }
    await this.props.deleteChallengeMutation(mutationParams)
  }

  render(){
    const {challenge} = this.props
    const {title, description} = challenge
    const handleDeleteCallback = () => this.handleDeleteChallenge()

    return(
    <div className="grid-center">
      <div className="col-10_sm-12">
        <Card zDepth={4} style={this.styles.card}>
          <CardHeader
            title={title}
            subtitle={description}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
            <FlatButton
              label="Delete"
              onClick={()=> requireAuth(handleDeleteCallback)}
              secondary={true}
            />
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <ChallengeUpdateForm
            form={`challengeUpdateForm${challenge.id}`}
            initialValues={{title, description}}
            onSubmit={this.handleUpdateChallengeSubmit}
          />
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

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired,
}

export default ChallengeCardApollo
