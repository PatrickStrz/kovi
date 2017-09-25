// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
//gql
import {graphql} from 'react-apollo'
import {ENTRY_DETAIL_QUERY} from 'gql/Entry/queries'
//other
import {withRouter} from 'react-router-dom'
//components
import GenericError from 'ui-kit/GenericError'
import ChallengeDetail from 'components/challenges/ChallengeDetail'
import GenericLoader from 'ui-kit/GenericLoader'
import {Dialog} from 'ui-kit'

export class EntryDetailContainer extends Component {

  static propTypes = {
    // data: PropTypes.shape({
    //   loading: PropTypes.bool.isRequired,
    //   error: PropTypes.object,
    //   Challenge: PropTypes.object,
    // }).isRequired,
  }

  // renderBody = () => {
  //   if (this.props.data.loading) {
  //     return <GenericLoader text="loading..." />
  //   }
  //   else if (this.props.data.error) {
  //     return <GenericError />
  //   }
  //   else {
  //     // const {title, body, author} = this.props.data.Challenge
  //     // const id = this.props.match.params.id
  //     // const {apiUserId} = this.props
  //
  //     return(
  //       // <EntryDetail
  //       //   id={id}
  //       //   title={title}
  //       //   body={body}
  //       //   apiUserId={apiUserId}
  //       //   authorId={author.id}
  //       // />
  //       <div>Entry detailing it!</div>
  //     )
  //   }
  // }

  render(){
    const {competition_id} = this.props.match.params
    return(
      <Dialog
        isOpen={true}
        handleClose={()=> this.props.history.push(`/competition/${competition_id}/`)}
        title="challengeDetail"
      >
        <div>
          <h1>yooooooooo</h1>
        </div>
      </Dialog>
    )
  }
}

const EntryDetailContainerApollo = graphql(
ENTRY_DETAIL_QUERY,{
  options: (ownProps) => ({variables: {id: ownProps.match.params.id}}),
})(EntryDetailContainer)

const mapStateToProps = (state) => ({
  apiUserId: state.app.auth.apiUserId
})

// export default withRouter(
//   connect(mapStateToProps)(EntryDetailContainerApollo)
// )
export default withRouter(
EntryDetailContainer
)
