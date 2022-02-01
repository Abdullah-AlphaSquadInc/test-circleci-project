import React from 'react';
import { FaUser, BiCalendarCheck } from 'react-icons/all';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { convertDate } from '../../../../utilities/CommonMethods';

const ClientUser = (props) => {

    const { data, onClick } = props;
    const styleIcon = { fontSize: '12px', marginLeft: '4px' };

    return(

        <div className="app-flex-row align-items-center justify-content-between py-1 cursor-pointer-sort" onClick={() => onClick(data)}>
            <span style={{ width: '4%' }}> <Avatar src={data?.src} medium /> </span>
            <span> { data?.name } </span>
            <span>
                { convertDate(data?.date) }
            </span>
            <span>
                <div className="app-flex-row align-items-center">
                    <span className="mr-1">{ data?.peoplePerPackage }</span>
                    <span className="mb-1"><FaUser style={styleIcon} /></span>
                    <span className="ml-2 mr-1">{ data?.durationDays }</span>
                    <span className="mb-1"><BiCalendarCheck style={styleIcon} /></span>
                </div>
            </span>
        </div>

    );

}
 
export default ClientUser;