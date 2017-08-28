import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hideAlert} from 'actions/alert-actions'
//components
import Snackbar from 'material-ui/Snackbar'

class Alert extends Component {

  static propTypes = {
    //redux
    message: PropTypes.node.isRequired,
    hideAlert: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isOpen: false,
  }

  handleRequestClose = () => {
    this.props.hideAlert()
  }

  render() {
    const {message} = this.props
    if (message){
    }
    return (
        <Snackbar
          open={message ? true : false}
          message={message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hideAlert
  }, dispatch)
}

const mapStateToProps = (state) => ({
  message: state.app.alerts.message
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
