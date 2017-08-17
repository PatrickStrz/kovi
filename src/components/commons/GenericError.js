import React from 'react'
import {muiColors} from '../../lib/theme/colors'
import FlatButton from 'material-ui/FlatButton'
import {logExceptionWithReport} from '../../config'

const GenericError = (props) =>
<div>
  <h1 style={{color:muiColors.primary1}}>
    Request Error (¬▂¬)
  </h1>
  <span>
    <h4>Please check your connection</h4> orion

    {
      props.error && <FlatButton
        onTouchTap={()=> logExceptionWithReport(props.error)}
        label="Report it"
      />
    }
  </span>
</div>


export default GenericError
