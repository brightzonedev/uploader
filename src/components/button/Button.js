import React from 'react'

import './Button.css';

const Button = (props) => {
    const { onUpload, onVerify, type, name, value, accept, enctype, method, action } = props;
    return (
        <div className='button-component'>
            <form action={action} method={method} encType={enctype}>
                <input type={type} name={name} accept={accept} value={value} onChange={onUpload} onClick={onVerify} />
            </form>
        </div>
    );
};

export default Button;