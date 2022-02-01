import React, { useState } from 'react';

import { MdLocationOn } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';
import RatingStar from '../../../../../components/RatingStar/RatingStar';
import { convertDate } from '../../../../../utilities/CommonMethods';

const AccountItem = ({ promotion, location }) => {    

    const style = {
        fontSize: '14px'
    };

    const styleColor = {
        color: 'var(--greyDark)'
    };

    return ( 

        <div className="account-item app-flex-column text-white w-100 py-2">
            
            <div className="app-flex-row align-items-center justify-content-between px-3">

                <div>
                    <h5> {promotion?.title} </h5>
                </div>
                <div className="app-flex-row align-items-center w-auto">
                    <RatingStar rating={parseFloat(promotion?.rating)} />
                    <span className="ml-2 pt-2">4.0</span>
                </div>

            </div>

            <div className="app-flex-row align-items-center px-3 mb-3">
                <MdLocationOn className="mr-1 text-white" style={style} />
                <p style={{ fontSize: '10px' }}>{location}</p>
            </div>

            <img alt="" src={promotion?.images[0]} height="200px" className="two-column-layout-right-img" />

            <div className="app-flex-row align-items-center justify-content-between pb-1 px-3 mt-2">
                <span>Promotion Validity</span>
                <p style={{ fontSize: '16px', color: 'var(--skyblue)' }}>${promotion?.price}</p>
            </div>

            <div className="app-flex-row align-items-center justify-content-between pb-1 px-3" style={{ ...styleColor, fontSize: '11px' }}>
                <span><FaRegCalendarAlt /> {convertDate(promotion?.startDate)} - {convertDate(promotion?.endDate)}</span>
                <p className="text-white">for {promotion?.durationDays} days</p>
            </div>

            <div className="app-flex-row px-3" style={{ ...styleColor, fontSize: '14px' }}>
                <p>{promotion?.about}</p>
            </div>

        </div>

    );

}
 
export default AccountItem;