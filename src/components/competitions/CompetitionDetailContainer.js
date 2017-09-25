import React, {Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {COMPETITION_DETAIL_QUERY} from 'gql/Competition/queries'
// other
import {logException} from 'config'
//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'
//other
import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'
// import {withRouter, Route, BrowserRouter} from 'react-router'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import EntryList from 'components/competitions/EntryList'
import EntryDetailContainer from 'components/competitions/EntryDetailContainer'
//components

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h2`
  text-align: center;
  color: ${muiColors.primary1}
`

class CompetitionDetailContainer extends Component {
  static propTypes = {
    competitions: PropTypes.array
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

     const {description, entries} = this.props.data.Competition
    return(
      <Box>
        <Title>{description}</Title>
        <EntryList entries={entries}/>
        <BrowserRouter>
          <Route path="/competition/:id/entry/:id" component={EntryDetailContainer}/>
        </BrowserRouter>
      </Box>
    )
  }
}

const CompetitionDetailContainerApollo = graphql(
COMPETITION_DETAIL_QUERY,{
  options: (ownProps) => ({variables: {id: ownProps.match.params.id}}),
})(CompetitionDetailContainer)

 export default withRouter(CompetitionDetailContainerApollo)
