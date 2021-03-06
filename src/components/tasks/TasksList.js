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
import Dialog from 'ui-kit/Dialog'
import DiscussionContainer from 'components/discussion/DiscussionContainer'
import DiscussionCommentsContainer from 'components/discussion/DiscussionCommentsContainer'

class TasksList extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    showDiscussionView: PropTypes.func.isRequired, // redux action
    hideDiscussionView: PropTypes.func.isRequired, // redux action
    state: PropTypes.shape({
      openDiscusionId: PropTypes.string.isRequired,
    }).isRequired,
  }

  renderDiscussionView = () =>{
    const discussionId = this.props.state.openDiscusionId
    return(
      <Dialog
        title={'Discussion'}
        isOpen={true}
        handleClose={this.props.hideDiscussionView}
      >
        <div>
          <DiscussionContainer discussionId={discussionId}/>
          <DiscussionCommentsContainer discussionId={discussionId} />
        </div>
      </Dialog>
    )
  }

  renderTaskCards = () => {
  const {tasks} = this.props
    return tasks.map(task => {
      if (task.type === 'Discussion'){
        return(
            <Card
              key={'tasklist'+task.id}
              text={task.discussion.topic}
              onBodyClick={()=>{this.props.showDiscussionView(task.discussion.id)}}
            />
          )
        }
        else return ''
      }
    )
  }
  render(){
    return(
      <div>
        {this.renderTaskCards()}
        {this.props.state.openDiscusionId && this.renderDiscussionView()}
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

const mapStateToProps = state => ({
  state:{
    openDiscusionId: state.app.community.openDiscusionId,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksList)
