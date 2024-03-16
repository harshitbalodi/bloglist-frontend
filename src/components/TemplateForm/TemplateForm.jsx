import React from 'react'
import './TemplateForm.css'

const TemplateForm = ({ children}) => {
  return (
    <div className='template-form-wrapper'>
        {children}
    </div>
  )
}

export default TemplateForm