// React
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//components
import ChallengeCard from './ChallengeCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import GenericLoader from 'ui-kit/GenericLoader'
import {Dialog} from 'ui-kit'
import SolutionFormContainer from 'components/solutions/SolutionFormContainer'

export default class ChallengeList extends Component {
  static propTypes = {
    challenges: PropTypes.array.isRequired,
    allChallengesQueryVariables: PropTypes.object.isRequired,
    loadMoreEntries: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
  }

  state = {
    scrollTop: false,
    solutionFormOpenFor:'', //set to challengeId when want to open form
  }

  handleCloseSolutionForm = () => {
    this.setState({solutionFormOpenFor:''})
  }

  openSolutionForm = (challengeId) => {
    this.setState({solutionFormOpenFor:challengeId})
  }

  renderChallengeCards = () => {

    const {
      challenges,
      allChallengesQueryVariables,
    } = this.props

    return challenges.map(challenge => {
      const {id} = challenge
      return(
        <div key={'challengelist'+id}>
          <ChallengeCard
            openSolutionForm={()=>this.openSolutionForm(id)}
            challenge={challenge}
            allChallengesQueryVariables={allChallengesQueryVariables}
          />
        </div>
        )
      }
    )
  }

  renderSolutionForm = () => {
    return(
      <Dialog
        isOpen={true}
        title="solutionFormOpenFor"
        handleClose={this.handleCloseSolutionForm}
      >
        <SolutionFormContainer challengeId={this.state.solutionFormOpenFor}/>
      </Dialog>
    )
  }

  render(){
    const {hasMore, loadMoreEntries} = this.props
    const {solutionFormOpenFor} = this.state
    /* ---------------- render return -----------------*/

    return(
      <div>
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
        {solutionFormOpenFor && this.renderSolutionForm()}
      </div>
    )
  }
}
