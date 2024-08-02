import React from 'react';
import CrossIcon from '../../assets/cross-icon.svg';
import './PopUpArea.css';

const PopUpArea = ({children,onClick,...props}) => {
    const handleClick = (e) =>{
        e.stopPropagation();
    }
  return (
    <div className='pop-up-wrapper' onClick={onClick}>
        <div className='pop-up-container' onClick={handleClick} {...props}>
        <div className='cross-icon' onClick={onClick}>
            <img src={CrossIcon} alt="❌" />
        </div>
        {...children}
        </div>
    </div>
  )
}

export default PopUpArea