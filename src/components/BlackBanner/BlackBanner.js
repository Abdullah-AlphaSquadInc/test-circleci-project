import React from 'react';

const BlackBanner = ({ children, transparent, bannerFont }) => {

    return ( 
        
        <div className={`
            app-flex-column align-items-center justify-content-center px-3 mb-1 text-white position-relative
        `} 
            style={{ height: '42px', background: transparent ? '' : '#232534' }}
        >
        
            <div className="app-flex-row align-items-center text-uppercase" style={{ fontSize: bannerFont ? '12px' : '15px' }}>
                {children}
            </div>
        
        </div> 
    
    );
}
 
export default BlackBanner;