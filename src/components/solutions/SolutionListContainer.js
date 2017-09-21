// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {SOLUTIONS_FOR_CHALLENGE_QUERY } from 'gql/Solution/queries'
//other
import styled from 'styled-components'
//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'
import ProductCard from 'components/solutions/ProductCard'

const SolutionsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

export class SolutionListContainer extends Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.object,
      allSolutions: PropTypes.array,
    }).isRequired,
    challengeId: PropTypes.string.isRequired,
  }

  renderSolutions = () => {
    const {allSolutions} = this.props.data
    return(
      allSolutions.map(solution => {
        return(
          <ProductCard
            key={'solution'+solution.id}
            product={solution.product}
          />
        )
      })
    )
  }

  renderBody = () => {
    if (this.props.data.loading) {
      return <GenericLoader text="loading..." />
    }
    else if (this.props.data.error) {
      return <GenericError />
    }
    else {
      return(
        <SolutionsBox>
          {this.renderSolutions()}
        </SolutionsBox>
      )
    }
  }

  render(){
    return(
      <div>
        {this.renderBody()}
        solutions list! for challenge: {this.props.challengeId}
      </div>
    )
  }
}

const SolutionListContainerApollo = graphql(
SOLUTIONS_FOR_CHALLENGE_QUERY ,{
  options: (ownProps) => ({variables: {challengeId: ownProps.challengeId}}),
})(SolutionListContainer)

export default SolutionListContainerApollo
