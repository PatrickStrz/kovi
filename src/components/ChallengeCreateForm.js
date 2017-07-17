import React from 'react'
import { Field,reduxForm, } from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton';

  const styles = {
    input: {
      width: '55vw'
    }
  }
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
    const {handleSubmit, submitting, error, children} = props
    return(
        <form onSubmit={handleSubmit}>
          <div style={styles.childrenContainer}>
          <Field
            style={styles.input}
            floatingLabelText="title"
            name="title"
            component={TextField}/>
          <br />
          <Field
            style={styles.input}
            floatingLabelText="description"
            name="description"
            component={TextField}
            type=""/>
        </div>
          <br />
          <br />
          <div style={styles.childrenContainer}>
            {children}
          </div>
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
},null)(ChallengeCreateForm)
