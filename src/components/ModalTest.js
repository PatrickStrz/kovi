import React from 'react'
import Dialog from 'ui-kit/Dialog'

const ModalTest = () =>{
  return(
    <div>
      <Dialog
        isOpen={true}
        >
        <h1>
          content for modal test
        </h1>
      </Dialog>
    </div>
  )
}

export default ModalTest
