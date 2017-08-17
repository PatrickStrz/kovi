// React
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//components
import ChallengeCard from './ChallengeCard'
import {Col, Row} from 'react-flexbox-grid'
import InfiniteScroll from 'react-infinite-scroll-component'


export default class ChallengeList extends Component {
  static propTypes = {
    challenges: PropTypes.array.isRequired,
    apiUserId: PropTypes.string.isRequired,
    allChallengesQueryVariables: PropTypes.object.isRequired,
    loadMoreEntries: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
  }

  renderChallengeCards = () => {

    const {
      challenges,
      allChallengesQueryVariables,
      apiUserId,
    } = this.props

    return challenges.map(challenge => {
      return(
        <Col key={'challengelist'+challenge.id} xs={12}>
          <ChallengeCard
            challenge={challenge}
            apiUserId={apiUserId}
            allChallengesQueryVariables={allChallengesQueryVariables}
          />
        </Col>
        )
      }
    )
  }

  /* ---------------- Render -----------------*/

  render(){
    const {hasMore, loadMoreEntries} = this.props

    return(
      <InfiniteScroll
        pageStart={0}
        hasMore={hasMore}
        loader={<div className="loader">Loading ...</div>}
        next={loadMoreEntries}
       >
        <Col
          xsOffset={1} xs={10}
          smOffset={1} sm={10}
          mdOffset={3} md={6}
          lgOffset={3} lg={6}
        >
          <Row>
            {this.renderChallengeCards()}
          </Row>
        </Col>
      </InfiniteScroll>
    )
  }
}
