// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
//components
import ProductCard from 'components/solutions/ProductCard'

const SolutionsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

export class SolutionList extends Component {

  static propTypes = {
    solutions: PropTypes.array.isRequired,
  }


  renderSolutions = () => {
    const {solutions} = this.props
    if (solutions.length > 0){
      return(
        solutions.map(solution => {
          return(
            <ProductCard
              key={'solution'+solution.id}
              product={solution.product}
            />
          )
        })
      )
    }
    else {
      return(
        <div>nothin here yet please add one</div>
      )
    }
  }

  render(){
    return(
      <div>
        <SolutionsBox>
          {this.renderSolutions()}
        </SolutionsBox>
      </div>
    )
  }
}

export default SolutionList
