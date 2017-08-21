import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {colors} from 'styles/theme/colors'
import {media} from 'styles/media-queries'

const AppBox = styled.div`
  min-height:100vh;
  width:100%;
  display: flex;
  flex-basis: auto;
  background-color: ${colors.mainBackground};
  flex-direction: row;
`
const LeftPanel = styled.div`
 width: 20%;
 ${ props => props.showLines && css`border: solid 6px #ee6662;`}
 ${media.md`display:none;`}
`

const CenterPanel = styled.div`
 width: 60%;
 ${media.md`width: 100%`}
 ${ props => props.showLines && css`border: solid 6px #7be1eb;`}
 display: flex;
 flex-direction: column;
 `

const RightPanel = styled.div`
  width: 20%;
  ${ props => props.showLines && css`border: solid 6px #ee6662;`}
  ${media.md`display:none;`}
`

const HomeLayout = (props) => {
  const {showLines} = props
  return(
    <AppBox>
      <LeftPanel showLines={showLines}/>
        <CenterPanel showLines={showLines}>
          {props.centerPanelContent}
        </CenterPanel>
      <RightPanel showLines={showLines}/>
    </AppBox>
  )
}

HomeLayout.propTypes = {
  centerPanelContent: PropTypes.node.isRequired,
  leftPanelContent: PropTypes.node,
  rightPanelContent: PropTypes.node,
  // See colored borders of layout components for development:
  showLines: PropTypes.bool,
}

HomeLayout.defaultProps = {
  showLines: false,
}

export default HomeLayout
