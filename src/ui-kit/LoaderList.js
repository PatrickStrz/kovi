import React from 'react'
import PropTypes from 'prop-types'
import {range} from 'lodash'
import randomstring from 'randomstring'

// takes a loader and length (number of loaders) and renders a list of loaders
const LoaderList = (props) => {
  const n = range(props.length)

  const renderLoaders = () => {
      return n.map(() => {
          return(
            <div key={randomstring.generate(5)}>
              {props.loader}
            </div>
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
