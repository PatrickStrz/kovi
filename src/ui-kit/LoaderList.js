import React from 'react'
import PropTypes from 'prop-types'
// helpers + other
import styled from 'styled-components'
import {range} from 'lodash'
import randomstring from 'randomstring'
import {loadingOpacity} from 'styles/animations/keyframes'

const LoaderBox = styled.div`
  animation: ${loadingOpacity} 1.25s infinite;
`

/* takes a component and length (number of nodes to render)
  and renders a list of loaders with loading animations applied to each node
*/
const LoaderList = (props) => {
  const n = range(props.length)

  const renderLoaders = () => {
      return n.map(() => {
          return(
            <LoaderBox key={randomstring.generate(5)}>
              {props.loader}
            </LoaderBox>
          )
        }
      )
    }

  return(
    <div>
      {renderLoaders()}
    </div>
  )
}

LoaderList.propTypes = {
  length: PropTypes.number.isRequired,
  loader: PropTypes.node.isRequired,
}
export default LoaderList
