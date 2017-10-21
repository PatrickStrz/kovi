import React from 'react'
import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'

const PageNotFound = () => {
  return(
    <Header>
      Page Not Found ¯\_(ツ)_/¯
    </Header>
  )
}

const Header = styled.h1`
  text-align: center;
  color: ${muiColors.primary1};
`

export default PageNotFound
