// React
import React,{Component} from 'react'
import PropTypes from 'prop-types'
// lib + other
import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'
import {loadingOpacityKeyframes} from 'styles/animations/keyframes'
//components
import ChallengeCard from './ChallengeCard'
import InfiniteScroll from 'react-infinite-scroll-component'

const Loader = styled.h1`
  color: ${muiColors.primary1};
  text-align: center;
  animation: ${loadingOpacityKeyframes} 1.25s infinite;
`

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
        <div key={'challengelist'+challenge.id}>
          <ChallengeCard
            challenge={challenge}
            apiUserId={apiUserId}
            allChallengesQueryVariables={allChallengesQueryVariables}
          />
        </div>
        )
      }
    )
  }


  render(){
    const {hasMore, loadMoreEntries} = this.props

    /* ---------------- render return -----------------*/

    return(
      <InfiniteScroll
        pageStart={0}
        hasMore={hasMore}
        loader={<Loader>...</Loader>}
        next={loadMoreEntries}
       >
        {this.renderChallengeCards()}
      </InfiniteScroll>
    )
  }
}
