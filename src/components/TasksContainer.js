import React,{Component} from 'react'
import PropTypes from 'prop-types'
// gql
import {graphql} from 'react-apollo'
import {ALL_TASKS_QUERY} from 'gql/Task/queries'
// other
import styled from 'styled-components'
import {logException} from '../config'
//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'

 class TaskContainer extends Component {
   render(){
       if (this.props.loading){
           return <GenericLoader />
         }

         if(this.props.error){
           logException(this.props.error, {action: 'query in TaskContainer'})
           return <GenericError />
         }

     return(
       <div>
         <h2>Task list!</h2>
       </div>
     )
   }
 }

 const TaskContainerApollo = graphql(ALL_TASKS_QUERY)(TaskContainer)

 export default TaskContainerApollo
