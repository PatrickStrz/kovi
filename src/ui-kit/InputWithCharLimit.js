import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
//components
import TextField from 'material-ui/TextField'

const CharCount = styled.p`
    color: ${props => props.color };
`
const TitleBox = styled.div`
  width:90%;
`

class InputWithCharLimit extends Component {
  state = {error: ''}

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    charMax: PropTypes.number.isRequired,
    onError: PropTypes.func.isRequired, // callback that accepts string arg
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.error) {
      this.props.onError(nextState.error)
    }
    else if (this.state.error && !nextState.error){
      this.props.onError('') //clears error
    }
  }

  setError = (value) => {
    let error = "" // clears error

    if (!value){
      error = "Please write a title"
    }
    if (value.length > (this.props.charMax)){
      error = "Above character limit"
    }
    this.setState({error:error})
  }

  handleChange = e => {
    const {onChange} = this.props
    const value = e.target.value
    onChange(value)
    this.setError(value)
    if (this.state.error){
    }
  }

  renderRemainingCharCount = () => {
    const {charMax, value} = this.props
    const charCount = value.length
    const remainingChars = this.props.charMax - charCount
    const {warningRed, lightGrey} = colors
    return(
      <CharCount
        color={remainingChars <= (0.2*charMax) ? warningRed : lightGrey}>
        {remainingChars}
      </CharCount>
    )
  }

  render(){
    const {value} = this.props
    return(
      <TitleBox>
        <TextField
          id="challengeCreateTitle"
          fullWidth={true}
          hintText="write a concise title"
          onChange={this.handleChange}
          value={value}
          errorText={this.state.error}
          multiLine={true}
        />
        {this.props.value && this.renderRemainingCharCount()}
      </TitleBox>

    )
  }
}

export default InputWithCharLimit
