// React
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hideProductSolutionForm} from 'actions/product-actions'
//components
import ChallengeCard from './ChallengeCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import GenericLoader from 'ui-kit/GenericLoader'
import {Dialog} from 'ui-kit'
import ProductFormContainer from 'components/solutions/ProductFormContainer'

class ChallengeList extends Component {
  static propTypes = {
    challenges: PropTypes.array.isRequired,
    allChallengesQueryVariables: PropTypes.object.isRequired,
    loadMoreEntries: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    //redux
    productSolutionFormFor: PropTypes.string,
    hideProductSolutionForm: PropTypes.func,
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
      const {id} = challenge
      return(
        <div key={'challengelist'+id}>
          <ChallengeCard
            challenge={challenge}
            allChallengesQueryVariables={allChallengesQueryVariables}
          />
        </div>
        )
      }
    )
  }

  renderSolutionForm = () => {
    const {hideProductSolutionForm, productSolutionFormFor} = this.props
    return(
      <Dialog
        isOpen={true}
        title="productSolutionFormOpenFor"
        handleClose={hideProductSolutionForm}
      >
        <ProductFormContainer challengeId={productSolutionFormFor}/>
      </Dialog>
    )
  }

  render(){
    const {hasMore, loadMoreEntries, productSolutionFormFor} = this.props
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
        {productSolutionFormFor && this.renderSolutionForm()}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hideProductSolutionForm,
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    productSolutionFormFor: state.app.products.productSolutionFormFor,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList)
