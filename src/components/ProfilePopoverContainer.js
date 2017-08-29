// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {USER_QUERY} from '../gql/User/queries'
//other
import styled from 'styled-components'
//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'

const Box = styled.div`
    background-color: rgb(255, 255, 255);
    height: 75px;
    width: 250px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  `

export class ProfilePopoverContainer extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      User: PropTypes.object,
    }).isRequired,
  }

  render(){
    if (this.props.data.loading){
      return <Box><GenericLoader text="..." /></Box>
    }
    if (this.props.data.error){

      return <Box><GenericError /></Box>
    }
    const { name, pictureLarge} = this.props.data.User

    return(
      <Box>
        <h1>{name}</h1>
      </Box>
    )
  }
}

const ProfilePopoverContainerApollo = graphql(
  USER_QUERY,{
  options: ({ userId }) => ({ variables: {id: userId}}), // coming from own props
})(ProfilePopoverContainer)

export default ProfilePopoverContainerApollo
