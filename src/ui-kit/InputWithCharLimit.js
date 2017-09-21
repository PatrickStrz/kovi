import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'

const CharCount = styled.p`
    color: ${props => props.color };
`
const TitleBox = styled.div`
  width:90%;
`

class InputWithCharLimit extends Component {
  state = {error: ''}
  propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  setError = (value) => {
    let error = "" // clears error

    if (!value){
      error = "Please write a title"
    }
    if (value.length > (this.charMax)){
      error = "Above character limit"
    }
    this.setState({titleError:error})
  }

  // renderRemainingCharCount = () => {
  //   const charCount = this.state.title.length
  //   const remainingChars = this.charMax - charCount
  //   return(
  //     <CharCount color={remainingChars < 15 ? "red" : colors.lightGrey}>
  //       {remainingChars}
  //     </CharCount>
  //   )
  // }

  render(){
    const {value, onChange} = this.props

    return(
      <TitleBox>
        <TextField
          id="challengeCreateTitle"
          fullWidth={true}
          hintText="write a concise title"
          onChange={onChange}
          value={value}
          errorText={this.state.error}
          multiLine={true}
        />
        {/* {renderRemainingCharCount()} */}
      </TitleBox>

    )
  }
}

export default InputWithCharLimit
