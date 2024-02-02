import React from 'react'
import '../index.css'

const AddNotification = ({addMessage}) => {

  return addMessage && (
    <div className='add'>
        <p>{addMessage}</p>
    </div>
  )
}

export default AddNotification