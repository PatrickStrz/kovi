// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
//gql
import {graphql} from 'react-apollo'
// import {CHALLENGE_DETAIL_QUERY} from '../gql/Challenge/queries'
//other
//components
import GenericError from 'ui-kit/GenericError'
import ChallengeDetail from 'components/ChallengeDetail'
import GenericLoader from 'ui-kit/GenericLoader'

export class SolutionListContainer extends Component {

  // static propTypes = {
  //   data: PropTypes.shape({
  //     loading: PropTypes.bool.isRequired,
  //     error: PropTypes.object,
  //     Solutions: PropTypes.object,
  //   }).isRequired,
  //   challengeId: PropTypes.string.isRequired,
  // }

  // renderBody = () => {
  //   if (this.props.data.loading) {
  //     return <GenericLoader text="loading..." />
  //   }
  //   else if (this.props.data.error) {
  //     return <GenericError />
  //   }
  //   else {
  //     return(
  //       <div>SolutionList</div>
  //     )
  //   }
  // }

  render(){
    return(
      <div>
        {/* {this.renderBody()} */}
        solutions list! for challenge: {this.props.challengeId}
      </div>
    )
  }
}

export default SolutionListContainer

// const SolutionsListContainerApollo = graphql(
// CHALLENGE_DETAIL_QUERY,{
//   options: (ownProps) => ({variables: {id: ownProps.match.params.id}}),
// })(ChallengeDetailContainer)
//
// const mapStateToProps = (state) => ({
//   apiUserId: state.app.auth.apiUserId
// })
//
// export default withRouter(
//   connect(mapStateToProps)(SolutionsListContainerApollo)
// )
