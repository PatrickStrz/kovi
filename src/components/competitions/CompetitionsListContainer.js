import React,{Component} from 'react'
import PropTypes from 'prop-types'
// gql
import {graphql} from 'react-apollo'
import {ACTIVE_COMPETITIONS_QUERY} from 'gql/Competition/queries'
// other
import {logException} from 'config'
//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'
import CompetitionsList from 'components/competitions/CompetitionList'
import {withRouter} from 'react-router-dom'

 class CompetitionsListContainer extends Component {
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

    const {allCompetitions} = this.props.data

     return(
       <div>
         CompetitionsContainer
         <CompetitionsList competitions={allCompetitions}/>
       </div>
     )
   }
 }

 const CompetitionsListContainerApollo = graphql(ACTIVE_COMPETITIONS_QUERY)(CompetitionsListContainer)

 export default withRouter(CompetitionsListContainerApollo)
