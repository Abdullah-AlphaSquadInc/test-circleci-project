import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading = ({ variant, size }) => {
    return <Spinner animation="border" variant={ variant ? variant : 'dark' } size={size} />;    
}