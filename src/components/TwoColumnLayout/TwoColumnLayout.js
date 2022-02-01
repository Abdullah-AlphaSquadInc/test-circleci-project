import React from 'react';
import { FaTimes } from 'react-icons/fa';

const TwoColumnLayout = (props) => {
    
    const { closeViewLayout, leftSide, children, leftColor, onClick, leftWidth } = props;

    return (

        <div className={`two-column-layout position-relative pb-1 ${ closeViewLayout ? 'pt-3' : '' }`}
        style={{ overflowY: 'auto', height: '100%' }} >
            
            {closeViewLayout && <FaTimes className="close-icon" onClick={closeViewLayout} />}

            <div className="app-flex-row align-items-start justify-content-between w-100 pt-2 text-white">

                <div 
                    className={`p-2 cursor-pointer-sort ${ leftWidth ? 'mr-2' : '' } `} 
                    style={{ background: leftColor ? leftColor : 'var(--lightSecondary)', 
                    borderRadius: '4px', width: leftWidth ? leftWidth : '27%' }}
                    onClick={onClick}
                >

                    {leftSide}

                </div>

                <div className="app-flex-column" style={{ width: leftWidth ? '69%' : '71%' }}>

                    {children}

                </div>

            </div>

        </div>

    );

}
 
export default TwoColumnLayout;