import React from 'react';

import './Step.css';
import Button from "../button/Button";

const Step = (props) => {
    const { title, step, handleUpload, handleVerify } = props;
    return (
        <div className='step-component'>
            <h2 className='step-title'>{ title }</h2>
            { step === 1 && <Button type='file' name='file'
                                    accept='text/*' onUpload={handleUpload}
                                    enctype='multipart/form-data'
                                     />}
            { step === 2 && <Button type='button' name='upload' accept='' value='Save to drive' />}
        </div>
    );
};

export default Step;