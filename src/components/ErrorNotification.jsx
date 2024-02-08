import React from 'react'
import '../index.css'

const ErrorNotitfication = ({errorMessage}) => {
  return errorMessage && (
    <div className='error'>
        <p>{JSON.stringify(errorMessage)}</p>
    </div>
  )
}

export default ErrorNotitfication