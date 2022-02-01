import React from 'react';
import './ClientAbout.css';

import { getAboutClientData } from '../../../../utilities/CommonMethods';
import PreferenceData from '../../../../components/PreferenceData/PreferenceData';

const ClientAbout = (props) => {
    
    const { arrayPreference, subCategories, categories, preferences } = props;

    const arr = getAboutClientData(subCategories, categories, preferences);

    return (

        <div className="app-flex-column">

            {
                arr?.map((data, i) => (
                    data?.length ? 
                    data?.map((data2, index) => (
                        <PreferenceData key={index} data={data2} readOnly={true} checked={true} 
                        arrayPreference={arrayPreference} getCheckBoxValue={() => console.log()} />                        
                    ))
                    :
                    <PreferenceData key={i} data={data} readOnly={true} checked={true} 
                    arrayPreference={arrayPreference} getCheckBoxValue={() => console.log()} />
                ))
            }

        </div>

    );

}
 
export default ClientAbout;