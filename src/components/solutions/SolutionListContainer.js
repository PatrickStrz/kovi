// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {SOLUTIONS_FOR_CHALLENGE_QUERY } from 'gql/Solution/queries'
//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'
import SolutionList from 'components/solutions/SolutionList'

export class SolutionListContainer extends Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.object,
      allSolutions: PropTypes.array,
    }).isRequired,
    challengeId: PropTypes.string.isRequired,
  }

  renderBody = () => {
    const {loading, error, allSolutions} = this.props.data
    if (loading) {
      return <GenericLoader text="loading..." />
    }
    else if (error) {
      return <GenericError />
    }
    else {
      return(
        <SolutionList solutions={allSolutions}/>
      )
    }
  }

  render(){
    return(
      <div>
        {this.renderBody()}
      </div>
    )
  }
}

const SolutionListContainerApollo = graphql(
SOLUTIONS_FOR_CHALLENGE_QUERY ,{
  options: (ownProps) => ({variables: {challengeId: ownProps.challengeId}}),
})(SolutionListContainer)

export default SolutionListContainerApollo
