import React from 'react'
import '../index.css'

const ErrorNotitfication = ({errorMessage}) => {
  return errorMessage && (
    <div className='error'>
        <p>{errorMessage}</p>
    </div>
  )
}

export default ErrorNotitfication