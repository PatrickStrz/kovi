// React
import React,{Component} from 'react'
import PropTypes from 'prop-types'
// lib + other
// import styled from 'styled-components'
// import {muiColors} from 'styles/theme/colors'
//components
import Card from 'ui-kit/Card'

export default class TasksList extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
  }

  renderTaskCards = () => {
  const {tasks} = this.props

    return tasks.map(task => {
      return(
          <Card
            key={'tasklist'+task.id}
            text={task.discussion.topic ? task.discussion.topic : "no text"}
            onBodyClick={()=>{alert('id:'+task.id)}}
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
