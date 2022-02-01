import React from 'react';

import { MdLocationOn, FaPhone, MdEmail, FiClock } from 'react-icons/all';
import RatingStar from '../RatingStar/RatingStar';

const ShowDataWithRow = ({ children }) => {
    return <div className="app-flex-row align-items-center mb-2">{children}</div>
}

const BusinessAccountData = (props) => {
    
    const { time, showRating, location, email, phone, rating, businessName, smallHeading } = props;

    const style = {
        fontSize: '15px'
    };

    return ( 

        <div className="app-flex-column">
            
            { smallHeading ? <div className="mb-2 mt-1 text-greenShade">{businessName}</div> : 
            <h5 className="mb-2 mt-1">{ businessName }</h5> }

            {
                showRating ?
                <ShowDataWithRow>
                    <RatingStar rating={rating} />
                    <div className="mt-2 ml-2 text-orange"> {rating} </div>
                </ShowDataWithRow>
                :
                <>
                <ShowDataWithRow>
                    <MdLocationOn className="mr-2 text-white" style={style} />
                    <h6>{location}</h6>
                </ShowDataWithRow>
                <ShowDataWithRow>
                    <MdEmail className="mr-2 text-white" style={style} />
                    <h6>{email}</h6>
                </ShowDataWithRow>
                <ShowDataWithRow>
                    <FaPhone className="mr-2 text-white" style={style} />
                    <h6>{phone}</h6>
                </ShowDataWithRow>
                </>
            }

            { time && 
            <ShowDataWithRow>
                <FiClock className="mr-2 text-white" style={style} />
                <h6>{time}</h6>
            </ShowDataWithRow> }

        </div>

    );

}
 
export default BusinessAccountData;