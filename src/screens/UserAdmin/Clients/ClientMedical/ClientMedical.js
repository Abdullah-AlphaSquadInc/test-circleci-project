import React from 'react';
import CustomAccordian from '../../../../components/Accordian/Accordian';
import './ClientMedical.css';

import { IoCalendarOutline } from 'react-icons/all';

const ClientMedical = (props) => {
    
    return (

        <div className="app-flex-column">

            <CustomAccordian 
                icon={<IoCalendarOutline />}
                heading="alergies"
                text={props.medical?.allergies}
                background
            /> 

            <CustomAccordian 
                icon={<IoCalendarOutline />}
                heading="medication"
                text={props.medical?.medication}
                background
            /> 

            <CustomAccordian 
                icon={<IoCalendarOutline />}
                heading="doctor's information"
                text={props.medical?.doctorInformation}
                background
            />

            <CustomAccordian 
                icon={<IoCalendarOutline />}
                heading="emergency contact's"
                text={props.medical?.emergencyContact}
                background
            />            

        </div>

    );

}
 
export default ClientMedical;