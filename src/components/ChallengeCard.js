import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types'
import {requireAuth} from '../lib/auth'

const ChallengeCard = (props) => {

  const {id, title, description} = props.challenge
  const {handleDelete} = props
  const handleDeleteCallback = () => handleDelete(id)

  return(
  <div className="grid-center">
    <div className="col-10_sm-12">
      <Card zDepth={5}>
        <CardHeader
          title={title}
          subtitle={description}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <FlatButton onClick={()=> requireAuth(handleDeleteCallback)}>delete this ting</FlatButton>
        </CardActions>
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    <br/>
    </div>
  </div>
)
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default ChallengeCard
