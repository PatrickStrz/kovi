import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
//components
import Avatar from 'ui-kit/Avatar'
import {muiColors} from 'lib/theme/colors'

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserName = styled.div`
  color: ${muiColors.primary1};
  margin-left: 5px;
`

// Component that consists of user avatar with user name beside
const UserHeader = (props) => {
 return(
   <OuterContainer>
     <Avatar imageUrl={props.imageUrl} size={props.avatarSize} />
       <UserName>{props.userName}</UserName>
   </OuterContainer>
 )
}

UserHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  avatarSize: PropTypes.string.isRequired,
}

export default UserHeader
