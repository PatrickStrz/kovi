// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
//gql
import {graphql} from 'react-apollo'
import {CHALLENGE_DETAIL_QUERY} from '../gql/Challenge/queries'
//other
import {withRouter} from 'react-router'
//components
import GenericError from 'ui-kit/GenericError'
import ChallengeDetail from 'components/ChallengeDetail'
import GenericLoader from 'ui-kit/GenericLoader'
import {Dialog} from 'ui-kit'

export class ChallengeDetailContainer extends Component {

  static propTypes = {

    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      Challenge: PropTypes.object,
    }).isRequired,
  }

  renderBody = () => {
    if (this.props.data.loading){
      return <GenericLoader text="loading..." />
    }
    else if (this.props.data.error){
      return <GenericError />
    }
    else{
      const {title, body, author} = this.props.data.Challenge
      const id = this.props.match.params.id
      const {apiUserId} = this.props

      return(
        <ChallengeDetail
          id={id}
          title={title}
          body={body}
          apiUserId={apiUserId}
          authorId={author.id}
        />
      )
    }
  }

  render(){
    return(
      <Dialog
        isOpen={true}
        handleClose={()=> this.props.history.push('/')}
        title="challengeDetail"
      >
        {this.renderBody()}
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

export default withRouter(
  connect(mapStateToProps)(ChallengeDetailContainerApollo)
)
