import React from 'react';

import { Avatar } from '../../../../components/Avatar/Avatar';
import { Images } from '../../../../Assets/Images';
import StarRating from '../../../../components/RatingStar/RatingStar';
import { GetButtons } from '../../../../components/getButtons/getButtons';

const ShowInformation = (props) => {
    
    const { review } = props;
    
    return(

        <div className="app-flex-row pt-4 px-1 position-relative bg-transparent mh-100 overflow-auto">
            
            <Avatar name="name" src={ review?.reviewBy?.profileImage } />

            <div className="app-flex-column align-items-start ml-3 w-100">
                
                <div className="app-flex-row align-items-start justify-content-between mb-1">
                    <div className="app-flex-column">
                        <h6>{ review?.reviewBy?.name }</h6>
                        <div className="app-flex-row align-items-center">
                            <StarRating rating={review?.rating} />
                            <span className="mt-2 ml-2 text-orange">{review?.rating}</span>
                        </div>
                    </div>

                    <GetButtons title1="accept" title2="report" className="business-detail-buttons profile-info-button" 
                        click1={(e) => {
                            e.stopPropagation();
                            alert('s');
                        }} 
                        click2={(e) => {
                            e.stopPropagation();
                            alert('s');
                        }}  
                    />
                </div>

                <p className="text-greyDark pt-2">
                    { review?.message } 
                </p>

            </div>

        </div>

    );

}
 
export default ShowInformation;