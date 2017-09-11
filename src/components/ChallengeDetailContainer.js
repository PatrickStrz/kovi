// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {hideChallengeDetailView} from 'actions/challenge-actions'
//gql
import {graphql} from 'react-apollo'
import {CHALLENGE_DETAIL_QUERY} from '../gql/Challenge/queries'
//other
import {withRouter} from 'react-router'
//components
import GenericError from 'ui-kit/GenericError'
import ChallengeDetail from 'components/ChallengeDetail'
import GenericLoader from 'ui-kit/GenericLoader'
import Dialog from 'ui-kit/Dialog'

export class ChallengeDetailContainer extends Component {

  static propTypes = {

    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      Challenge: PropTypes.object,
    }).isRequired,
  }

  closeAndRedirect = () =>{
    this.props.hideChallengeDetailView()
  }

  render(){
    if (this.props.data.loading){
      return <GenericLoader text="loading..." />
    }
    if (this.props.data.error){
      return <GenericError />
    }

    const {title, body, author} = this.props.data.Challenge
    const id = this.props.match.params.id
    const {apiUserId} = this.props

    return(
      <Dialog
        isOpen={true}
        handleClose={()=> this.props.history.push('/')}
        title="challengeDetail"
        >
        <ChallengeDetail
          id={id}
          title={title}
          body={body}
          apiUserId={apiUserId}
          authorId={author.id}
        />
      </Dialog>
    )
  }
}

const ChallengeDetailContainerApollo = graphql(
CHALLENGE_DETAIL_QUERY,{
  options: (ownProps) => ({ variables: { id: ownProps.match.params.id } }), // coming from own props
})(ChallengeDetailContainer)

const mapStateToProps = (state) => ({
  apiUserId: state.app.auth.apiUserId
})

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({hideChallengeDetailView},dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChallengeDetailContainerApollo)
)
