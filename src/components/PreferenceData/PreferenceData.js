import React, { Fragment, useState } from 'react';
import BlackBanner from '../BlackBanner/BlackBanner';

import { RiArrowRightSLine } from 'react-icons/all';
import CheckBox from '../CheckBox/CheckBox';

const PreferenceData = ({ data, readOnly, arrayPreference, bannerFont, getCheckBoxValue }) => {
    
    return(

        <Fragment>
            <BlackBanner bannerFont>
                <img alt="" src={data?.category?.image} width="12px" height="12px" />
                <span className="ml-2 mr-2">{data?.category?.name}</span>
                { data?.subCategory !== undefined && <>
                    <RiArrowRightSLine />
                    <img alt="" src={data?.subCategory?.image} width="12px" height="12px" />
                    <span className="ml-2">{data?.subCategory?.name}</span>                            
                </> }

            </BlackBanner>
            {
                data?.preferences?.length ? data?.preferences?.map((box, index) => (
                    <CheckBox label={box?.name} key={index} readOnly={readOnly} value={box?.name}
                        checked={ arrayPreference?.length ? (arrayPreference?.includes(box?.name) ? true : false) : false } 
                        onChange={(flag, val) => getCheckBoxValue(flag, val)}
                    />
                )) : null
            }
        </Fragment>

    );

}
 
export default PreferenceData;