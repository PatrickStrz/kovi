// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import randomstring from 'randomstring'
//components
import ProductCard from 'components/solutions/ProductCard'

export class SolutionList extends Component {

  static propTypes = {
    solutions: PropTypes.array,
    loading: PropTypes.bool,
  }

  renderSolutions = () => {
    if (this.props.loading) {
      const loaders = [1,2,3,4]
      return(
      <SolutionsBox>
        {loaders.map(loader =>
          <ProductCard
          key={randomstring.generate(5)}
          loadingPlaceholder={true}
        />)}
      </SolutionsBox>
      )
    }
    const {solutions} = this.props
    if (solutions.length > 0){
      return(
        solutions.map(solution => {
          if (solution.product){
            return(
              <ProductCard
                key={'solution'+solution.id}
                product={solution.product}
              />
            )
          }
          else {
            return ''
          }
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

export const SolutionsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 20px;
`

export default SolutionList
