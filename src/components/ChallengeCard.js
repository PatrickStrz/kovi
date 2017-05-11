import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import PropTypes from 'prop-types'

const ChallengeCard = (props) => {
  const {title, description} = props.challenge
  return(
  <div className="grid-center">
    <div className="col-10_sm-12">
      <Card>
        <CardHeader
          title={title}
          subtitle={description}
          actAsExpander={true}
          showExpandableButton={true}
        />
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
  challenge: PropTypes.object.isRequired
}

export default ChallengeCard
