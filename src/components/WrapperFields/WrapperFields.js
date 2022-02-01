import React from 'react';

export const WrapperFields = ({ children, width }) => {
    return <div className="app-flex-row align-items-center justify-content-between mb-4" style={{ width: width }}>
        {children}
    </div>;
}