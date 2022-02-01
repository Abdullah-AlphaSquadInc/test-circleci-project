import React from 'react';
import './CustomCard.css';

export const CustomCard = ({ children, className}) => {

    return(
        <div className={`custom-card ${className}`}>
            {children}
        </div>
    );
}