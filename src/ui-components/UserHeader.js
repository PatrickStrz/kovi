import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
//components
import Avatar from 'ui-components/Avatar'
import {muiColors, colors} from 'lib/theme/colors'



const OuterContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserName = styled.div`
  color: ${muiColors.primary1};
`

const Date = styled.div`
  color: ${colors.lightGrey};
  font-size: 14px;
`

const TextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 5px;
`
// Component that consists of user avatar with user name beside
const UserHeader = (props) => {
 return(
   <OuterContainer>
     <Avatar imageUrl={props.imageUrl} />
     <TextContainer>
       <UserName>{props.userName}</UserName>
       <Date>Jun 1</Date>
     </TextContainer>
   </OuterContainer>
 )
}

UserHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

export default UserHeader
