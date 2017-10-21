import React from 'react'
import PropTypes from 'prop-types'
import {muiColors, colors} from 'styles/theme/colors'
import styled from 'styled-components'

const MarkdownView = (props) => {
  return(
    <MarkdownBox styles={props.styles}>{props.children}</MarkdownBox>
  )
}

MarkdownView.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.string, // css string
}

const MarkdownBox = styled.div`
  ${props=> props.styles && props.styles}
  word-wrap: break-word;
  color: ${colors.grey};
  font-family: 'Open Sans', sans-serif;
  p {
    background-color: white;
    padding: 10px;
  }
  h1 {
    text-align: center;
    color: ${colors.medGrey};
  }
  h2 {
    text-align: center;
    color: ${colors.medGrey};
  }
  li {
    color: ${colors.medGrey};
  }
  ol {
    color: ${colors.medGrey};
  }
  border-radius: 3px;
  padding: 20px;
  a {
    color: ${muiColors.secondary1};
  }
`

export default MarkdownView
