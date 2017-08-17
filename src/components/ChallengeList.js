import React,{Component} from 'react'
import PropTypes from 'prop-types'
//components
import ChallengeCard from './ChallengeCard'
import {Col} from 'react-flexbox-grid'


export default class ChallengeList extends Component {
  static propTypes = {
    challenges: PropTypes.array.isRequired,
    apiUserId: PropTypes.string.isRequired,
    allChallengesQueryVariables: PropTypes.object.isRequired,
  }
  renderChallengeCards = () =>{
    const {challenges, allChallengesQueryVariables, apiUserId} = this.props

    return challenges.map(challenge =>{
      return(
        <Col key={'challengelist'+challenge.id} xs={12}>
          <ChallengeCard
            challenge={challenge}
            apiUserId={apiUserId}
            allChallengesQueryVariables={allChallengesQueryVariables}
          />
        </Col>
      )
    })
  }
  render(){
    return(
      <div>
        {this.renderChallengeCards()}
      </div>
    )
  }
}
