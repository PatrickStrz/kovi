import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {colors} from 'styles/theme/colors'

const Container = styled.div`
  cursor: pointer;
  .fa{
    color: ${colors.lightGrey};
    :hover{
      color: ${colors.errorRed};
    }
  }
`

const FaTrash = (props) => {
  return(
    <Container onClick={()=> props.handleClick()}>
      <i className="fa fa-trash" aria-hidden="true"></i>
    </Container>
  )
}

FaTrash.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default FaTrash
