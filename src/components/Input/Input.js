import React from 'react';
import './input.css';

export const Input = (props) => {

    const { type, id, value, onChange, place, pressEnter, inputref, className } = props;

    return <input type={type} id={id} value={value} 
            onChange={(e) => onChange(e)}
            placeholder={place} autoComplete="off"
            onKeyPress={(e) => e.key === 'Enter' && pressEnter(e)}
            className={className}
            ref={inputref}
            {...props}
        />;

}