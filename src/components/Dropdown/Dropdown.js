import React from 'react';

import { DropdownButton, Dropdown } from 'react-bootstrap';
import PreferenceData from '../PreferenceData/PreferenceData';

const CustomDropdown = (props) => {
    
    const { className, chooseOption, arr, title, prefrences, getCheckBoxValue } = props;

    return(

        <DropdownButton 
            className={`text-white m-0 p-0 w-100 ${className}`}
            menuAlign={{ lg: 'left' }}
            title={title ? (title?.length > 30 ? title.substring(0, 30)+' ...' : title) : 'Choose'}
            id="dropdown-item-button"
            >
                <div className="p-0 m-0 w-100">
                    
                    { prefrences && 
                        arr?.map((data, i) => (
                            data?.length ? 
                            data?.map((data2, index) => (
                                <PreferenceData key={index} data={data2} readOnly={false} checked={false} 
                                arrayPreference={[]} bannerFont getCheckBoxValue={(item) => getCheckBoxValue(item)} />                        
                            ))
                            :
                            <PreferenceData key={i} data={data} readOnly={false} checked={false} 
                                arrayPreference={[]} bannerFont getCheckBoxValue={(item) => getCheckBoxValue(item)} />
                        ))
                    }

                    {
                        (!prefrences && arr?.length) ? arr.map((item, index) => (
                            <Dropdown.Item key={index}
                                className="text-black py-1 border-0 overflow-auto" 
                                onClick={() => chooseOption(item)}
                                >
                                    {item?.value}
                            </Dropdown.Item>
                        )) : null
                    }

                </div>

        </DropdownButton>

    );

}
 
export default CustomDropdown;