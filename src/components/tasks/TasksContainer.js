import React,{Component} from 'react'
import PropTypes from 'prop-types'
// gql
import {graphql} from 'react-apollo'
import {ALL_TASKS_QUERY} from 'gql/Task/queries'
// other
import {logException} from 'config'
//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'
import TasksList from './TasksList'

 class TasksContainer extends Component {
   static propTypes = {
     data: PropTypes.shape({
       loading: PropTypes.bool.isRequired,
       error: PropTypes.string,
       discussion: PropTypes.object,
     }).isRequired, // apollo
   }

   render(){
     const {data} = this.props

     if (data.loading){
        return <GenericLoader />
      }

      if(data.error){
        logException(this.props.error, {action: 'query in TaskContainer'})
        return <GenericError />
      }

     return(
       <div>
         <TasksList tasks={data.allTasks}/>
       </div>
     )
   }
 }

 const TasksContainerApollo = graphql(ALL_TASKS_QUERY)(TasksContainer)

 export default TasksContainerApollo
