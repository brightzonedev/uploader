import React from 'react'

import './Button.css';

const Button = (props) => {
    const { onUpload, onVerify, type, name, value, accept, enctype } = props;
    return (
        <div className='button-component'>
            <form encType={enctype}>
                <input type={type} name={name} accept={accept} value={value} onChange={onUpload} onClick={onVerify} />
            </form>
        </div>
    );
};

export default Button;