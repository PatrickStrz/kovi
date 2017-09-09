// React
import React,{Component} from 'react'
import PropTypes from 'prop-types'
// helpers + other
import {normalizeToFeed} from 'lib/array-helpers'
//components
import ChallengeCard from './ChallengeCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import GenericLoader from 'ui-kit/GenericLoader'

export default class ChallengeList extends Component {
  static propTypes = {
    challenges: PropTypes.array.isRequired,
    apiUserId: PropTypes.string,
    allChallengesQueryVariables: PropTypes.object.isRequired,
    loadMoreEntries: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
  }

  state={scrollTop:false}

  feedify = (...lists) => {
    const listLengths = lists.map(list => list.length)
    const longestListLength = Math.max(...listLengths)
    const newArr = []
    for (let i = 0; i < longestListLength; i++){
      lists.forEach(list => list[i] && newArr.push(list[i]))
    };
  return newArr
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

  mapTaskList = () => {
    const {tasks} = this.props
    return tasks.map(task => <div
        style={{backgroundColor:'rgb(139, 236, 199)'}}
        key={'task'+task.id}
        >
        {task.type}
      </div>
    )
  }

  render(){
    const {hasMore, loadMoreEntries} = this.props
    const challengeList = this.renderChallengeCards()
    const taskList = this.mapTaskList()
    const feed = normalizeToFeed(challengeList, taskList)
    /* ---------------- render return -----------------*/

    return(
      <InfiniteScroll
        pageStart={0}
        hasMore={hasMore}
        loader={<GenericLoader text="..."/>}
        next={loadMoreEntries}
       >
         {this.state.scrollTop && window.scrollTo(0,0)}
        {/* {this.renderChallengeCards()} */}
        {feed}
      </InfiniteScroll>
    )
  }
}
