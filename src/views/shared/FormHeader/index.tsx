import React from 'react';
import NextButton from '../NextButton';
import "./style.scss";

const FormHeader = ({title}: { title: string }) => (
    <div className='form-header'>
        <NextButton />
        <p className='title'>{title}</p>
    </div>
)

export default FormHeader;