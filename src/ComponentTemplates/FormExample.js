//react
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
//gql
import {graphql, compose} from 'react-apollo'
import {
  CREATE_PRODUCT_SOLUTION_MUTATION,
  // UPDATE_PRODUCT_SOLUTION_MUTATION,
} from 'gql/Solution/mutations'
// import {ALL_CHALLENGES_QUERY} from 'gql/Challenge/queries'
// import {CHALLENGE_CREATE_SCORE} from 'lib/score-system'
//helpers+other
import {logException} from 'config'
import styled from 'styled-components'
// import {media} from 'styles/media-queries'
//components
import RaisedButton from 'material-ui/RaisedButton'
import {ImageUpload, InputWithCharLimit} from 'ui-kit'

const FormBox = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: 70%;
  margin-left: 15%;
   ${media.md`
     width:90%;
     margin-left: 5%;
     align-items: left;
  `}
`

class ProductFormContainer extend Component {

  handleTitleChange = value => {
    this.setState({title: value})
  }

  handleTitleError = errorMsg => {
    if (errorMsg !== this.state.titleError) {
      this.setState({titleError:errorMsg})
    } // prevent infinite loop
  }

  onUpload = (imageId, imageUrl) => {
    this.setState({imageId, imageUrl})
  }

  checkRequiredFields = () => {
    const {title} = this.state
    if (!title){
      this.setState({titleError:"title is required"})
    }
  }

  isDisabled = () => {
    const {titleError, title, imageId} = this.state
    let isDisabled
      if (
        !titleError &&
        title &&
        this.props.editorHtml &&
        imageId
      ){
        isDisabled = false
      }
      else {
        isDisabled = true
      }
    return isDisabled
  }

  handleSubmit = () => {

  }

    render() {
      return(
        <FormBox>
          <InputWithCharLimit
            onChange={this.handleTitleChange}
            value={this.state.title}
            charMax={20}
            onError={this.handleTitleError}
            required={true}
          />
          <br/>
        </FormBox>
      )
    }
}

const ProductFormContainerApollo = compose(
  graphql(
    CREATE_PRODUCT_SOLUTION_MUTATION,
    {name:"createProductSolutionMutation"}
  ),
  // graphql(
  //   UPDATE_PRODUCT_SOLUTION_MUTATION,
  //   {name:"updateProductSolutionMutation"}
  // ),
)(ProductFormContainer)

export default connect(
  mapStateToProps, mapDispatchToProps
)(ProductFormContainerApollo)
