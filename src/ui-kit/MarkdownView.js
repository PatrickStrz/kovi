import React from 'react'
import PropTypes from 'prop-types'
import {muiColors, colors} from 'styles/theme/colors'
import styled from 'styled-components'

const MarkdownBox = styled.div`
  padding-left: 5vw;
  padding-right: 5vw;
  word-wrap: break-word;
  color: ${colors.grey};
  h1 {
    text-align: center;
    color: ${colors.medGrey};
  }
  h2 {
    text-align: center;
    color: ${colors.medGrey};
  }
  border-radius: 3px;
  padding: 20px;
  a {
    color: ${muiColors.primary1}
  }
`

const MarkdownView = (props) => {
  return(
    <MarkdownBox>{props.children}</MarkdownBox>
  )
}

MarkdownView.propTypes = {
  children: PropTypes.node.isRequired
}

export default MarkdownView
