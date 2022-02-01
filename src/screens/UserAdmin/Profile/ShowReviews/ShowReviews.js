import React from 'react';

const ShowReviews = (props) => {
    
    return(

        <div className="py-2" style={{ fontSize: '14px' }}>
            { props?.msg?.message }
        </div>

    );

}
 
export default ShowReviews;