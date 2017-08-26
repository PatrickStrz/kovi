// React
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { showDiscussionView, hideDiscussionView} from 'actions/community-actions'
// lib + other
// import styled from 'styled-components'
// import {muiColors} from 'styles/theme/colors'
//components
import Card from 'ui-kit/Card'

class TasksList extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    showDiscussionView: PropTypes.func.isRequired, // redux action
    hideDiscussionView: PropTypes.func.isRequired // redux action
  }

  renderTaskCards = () => {
  const {tasks} = this.props

    return tasks.map(task => {
      return(
          <Card
            key={'tasklist'+task.id}
            text={task.discussion.topic ? task.discussion.topic : "no text"}
            onBodyClick={()=>{this.props.showDiscussionView(task.id)}}
          />
        )
      }
    )
  }
  render(){
    return(
      <div>
        {this.renderTaskCards()}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showDiscussionView,
    hideDiscussionView,
  }, dispatch)
}

export default connect(null,mapDispatchToProps)(TasksList)
