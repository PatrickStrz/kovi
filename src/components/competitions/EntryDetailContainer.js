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
import EntryDetail from 'components/competitions/EntryDetail'
import GenericLoader from 'ui-kit/GenericLoader'
import {Dialog} from 'ui-kit'

export class EntryDetailContainer extends Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.object,
      Entry: PropTypes.object,
    }).isRequired,
  }

  renderBody = () => {
    if (this.props.data.loading) {
      return <GenericLoader text="loading..." />
    }
    else if (this.props.data.error) {
      return <GenericError />
    }
    else {
      const {Entry} = this.props.data

      return(
        <EntryDetail
          entry={Entry}
        />
      )
    }
  }

  render(){
    const {competition_id} = this.props.match.params
    return(
      <Dialog
        isOpen={true}
        handleClose={()=> this.props.history.push(`/competition/${competition_id}/`)}
        title="challengeDetail"
      >
      {this.renderBody()}
      </Dialog>
    )
  }
}

const EntryDetailContainerApollo = graphql(
ENTRY_DETAIL_QUERY,{
  options: (ownProps) => ({variables: {id: ownProps.match.params.entry_id}}),
})(EntryDetailContainer)

const mapStateToProps = (state) => ({
  apiUserId: state.app.auth.apiUserId
})

export default withRouter(
  connect(mapStateToProps)(EntryDetailContainerApollo)
)
