import React from 'react'

import './Button.css';

const Button = (props) => {
    const { onUpload, handleSaveToDrive, type, name, value, accept, enctype, fileName } = props;
    console.log('name', fileName);
    return (
        <div className='button-component'>
            <form encType={enctype}>
                <input type={type} name={name} accept={accept} value={value}
                       onChange={onUpload} onClick={handleSaveToDrive} />
            </form>
        </div>
    );
};

export default Button;