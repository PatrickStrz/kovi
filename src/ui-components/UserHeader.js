import React from 'react'
import styled from 'styled-components'
import Avatar from 'ui-components/Avatar'

const Container = styled.div`
  display: flex;
  align-items: center;
`
const UserHeader = () => {
 return(
   <Container>
     <Avatar></Avatar>
   </Container> 
 )
}

export default UserHeader
