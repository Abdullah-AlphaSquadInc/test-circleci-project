import React from 'react';
import './ClientPromotion.css';

import CustomAccordian from '../../../../components/Accordian/Accordian';
import { IoCalendarOutline, MdLocationOn, FaRegCalendarAlt } from 'react-icons/all';
import RatingStar from '../../../../components/RatingStar/RatingStar';

import { Images } from '../../../../Assets/Images';

const ClientPromotion = (props) => {
    
    const { currentPromotion } = props;

    const style = {
        fontSize: '14px'
    };

    return (

        <div className="app-flex-column">
            
            <img alt="" src={currentPromotion?.images[0]} height="300px" className="two-column-layout-right-img" />

            <div className="app-flex-row align-items-center justify-content-between px-3 py-2">

                <div><h5>{currentPromotion?.title}</h5></div>
                <p style={{ fontSize: '16px', color: 'var(--skyblue)' }}>${currentPromotion?.price}</p>

            </div>

            <div className="app-flex-row align-items-center px-3">
                <MdLocationOn className="mr-1 text-white" style={style} />
                <p style={{ fontSize: '10px' }}>{currentPromotion?.address?.streetAddress}</p>
            </div>

            <div className="app-flex-row align-items-center w-auto px-3 mb-2">
                <RatingStar rating={currentPromotion?.rating} />
                <span className="ml-2 pt-2">{currentPromotion?.rating}</span>
            </div>

            <div className="app-flex-row align-items-center justify-content-between pb-1 px-3 mt-2">
                <span>Promotion Validity</span>
            </div>

            <div className="app-flex-row px-3 pb-2" style={{ fontSize: '14px' }}>
                <p>
                    { currentPromotion?.about }
                </p>
            </div>

            <CustomAccordian 
                icon={<IoCalendarOutline />}
                heading="guidelines"
                text={currentPromotion?.guidelines}
            />

            <CustomAccordian 
                icon={<IoCalendarOutline />}
                heading="terms and conditions"
                text={currentPromotion?.termsAndConditions}
            />

        </div>

    );

}
 
export default ClientPromotion;