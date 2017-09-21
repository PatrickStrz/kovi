// React
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//components
import ChallengeSection from './ChallengeSection'
import InfiniteScroll from 'react-infinite-scroll-component'
import GenericLoader from 'ui-kit/GenericLoader'

export default class ChallengeList extends Component {
  static propTypes = {
    challenges: PropTypes.array.isRequired,
    allChallengesQueryVariables: PropTypes.object.isRequired,
    loadMoreEntries: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
  }

  state = {
    scrollTop: false,
  }

  renderChallengeCards = () => {

    const {
      challenges,
      allChallengesQueryVariables,
    } = this.props

    return challenges.map(challenge => {
      return(
        <div key={'challengelist'+challenge.id}>
          <ChallengeSection
            challenge={challenge}
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
        style={{overflow:'hidden'}}
        pageStart={0}
        hasMore={hasMore}
        loader={<GenericLoader text="..."/>}
        next={loadMoreEntries}
       >
         {this.state.scrollTop && window.scrollTo(0,0)}
        {this.renderChallengeCards()}
      </InfiniteScroll>
    )
  }
}
