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
 width: 27.5%;
 ${ props => props.showLines && css`border: solid 6px #ee6662;`}
 ${media.md`display:none;`}
`

const CenterPanel = styled.div`
 width: 45%;
 ${media.md`
   position: relative;
   width: 95%;
   left:2.5%;
   `} /* Center element when in mobile view ( < md )*/
 ${ props => props.showLines && css`border: solid 6px #7be1eb;`}
 flex-direction: column;
 align-items: flex-start;
 `

const RightPanel = styled.div`
  width: 27.5%;
  ${ props => props.showLines && css`border: solid 6px #ee6662;`}
  ${media.md`display:none;`}
`

const CompetitionDetailLayout = (props) => {
  const {showLines} = props
  return(
    <AppBox>
      <LeftPanel showLines={showLines}>
        {props.leftPanelContent}
      </LeftPanel>
        <CenterPanel showLines={showLines}>
          {props.centerPanelContent}
        </CenterPanel>
      <RightPanel showLines={showLines}>
        {props.rightPanelContent}
      </RightPanel>
    </AppBox>
  )
}

CompetitionDetailLayout.propTypes = {
  centerPanelContent: PropTypes.element.isRequired,
  leftPanelContent: PropTypes.element,
  rightPanelContent: PropTypes.element,
  // See colored borders of layout components for development:
  showLines: PropTypes.bool,
}

CompetitionDetailLayout.defaultProps = {
  showLines: false,
}

export default CompetitionDetailLayout
