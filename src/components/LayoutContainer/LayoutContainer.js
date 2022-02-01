import React from 'react';
import './LayoutContainer.css';

export const LayoutContainer = ({ children }) => {
    return(
        <div className="layout-container">
            {children}
        </div>
    );
}