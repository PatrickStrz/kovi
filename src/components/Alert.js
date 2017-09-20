import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hideAlert} from 'actions/alert-actions'
//other
import {colors} from 'styles/theme/colors'
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

  getStyle = () => {
    if (this.props.type === 'error'){
      return({
        backgroundColor: colors.warningRed,
      })
    }
    else{
      return { backgroundColor:'#000000'}
    }
  }

  render() {
    const {message} = this.props

    return (
        <Snackbar
          bodyStyle={this.getStyle()}
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
  message: state.app.alerts.message,
  type: state.app.alerts.type,
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
