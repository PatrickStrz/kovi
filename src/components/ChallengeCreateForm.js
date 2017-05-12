import React from 'react'
import { Field,reduxForm, } from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton';

  const validate = (values) =>{
    const errors = {}
    if (!values.title){
      errors.title = 'required'
    }
    if (!values.text){
      errors.text = 'required'
    }
    return errors
  }

  const ChallengeCreateForm = (props) => {
    const {handleSubmit, submitting, error} = props
    return(
        <form onSubmit={handleSubmit}>
          <Field floatingLabelText="title" name="title" component={TextField}/>
          <br />
          <Field floatingLabelText="description" name="description" component={TextField} type="text"/>
          <br />
          <br />
          <FlatButton label="Submit" secondary={true} type="submit" disabled={submitting}/>
          <br />
          <br />
          <strong style={{ color: '#ed3a3a', paddingTop:'5px'}} >{error && error}</strong>
        </form>
    )
  }

export default reduxForm({
  form: 'problemCreate',
  validate,
},null)(ProblemCreateForm)
