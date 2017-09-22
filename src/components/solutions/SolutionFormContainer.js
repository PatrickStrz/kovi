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
import {media} from 'styles/media-queries'
//components
import RaisedButton from 'material-ui/RaisedButton'
import {ImageUpload, InputWithCharLimit} from 'ui-kit'
import TextField from 'material-ui/TextField'

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

//title is product name

class ProductFormContainer extends Component {

  static propTypes = {
    challengeId: PropTypes.string.isRequired,
  }

  state = {
    title: "",
    url: "",
  }

  handleTitleChange = value => {
    this.setState({title: value})
  }

  handleUrlChange = e => {
    this.setState({url: e.target.value})
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
    alert('submitting:'+this.state.title)
  }
    render() {
      return(
        <FormBox>
          <InputWithCharLimit
            placeholder="write the name of the product"
            onChange={this.handleTitleChange}
            value={this.state.title}
            charMax={40}
            onError={this.handleTitleError}
            required={true}
          />
          <br/>
          <TextField
            id="productSolutionFormTitle"
            hintText="url of product website"
            onChange={this.handleUrlChange}
            value={this.state.url}
            // errorText={this.state.error}
            // multiLine={true}
          />
          <br/>
          <ImageUpload
            onUpload={this.onUpload}
            previewWidth="50px"
            previewHeight="50px"
          />
          <br/>
          <br/>
          <RaisedButton
            // label={update ? "update" : "submit product"}
            label="submit product"
            onClick={this.handleSubmit}
            primary={true}
            // disabled={this.isDisabled()}
          />
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

export default ProductFormContainerApollo
