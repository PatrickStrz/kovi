import React,{Component} from 'react'
import {compose,graphql} from 'react-apollo'
import PropTypes from 'prop-types'
import {
  deleteChallengeMutation,
  updateChallengeMutation,
} from '../mutations/challenge-mutations'
import {requireAuth} from '../lib/auth'
import ChallengeUpdateForm from './ChallengeUpdateForm'
import {allChallengesQuery} from '../queries/challenge-queries'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import {muiColors} from '../lib/theme/colors'
import ChallengeLike from './ChallengeLike'

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
    this.setState({updateFormVisible:false, updateInProgress:false})
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
    const {title, description, upvotes} = this.props.challenge

    return(

    <div className="grid-center">
      <div className="col-1_sm-1">
        <ChallengeLike />
        <IconButton
          style = {{paddingTop:50}}
          // onTouchTap={()=>handleLogin()}
          iconStyle={{height:30, width:30}}
        >
          <ThumbUp
            // color={muiColors.primary1}
            // style = {{paddingTop:40, marginTop:"20px"}}
            color={ upvotes.includes("facebook|10154990636666251") ? muiColors.secondary1 : "#6f6f6f"}

            hoverColor={muiColors.secondary1}
          />
        </IconButton>
      </div>

      <div className="col-9_sm-9">
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
