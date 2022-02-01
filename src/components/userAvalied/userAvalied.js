import React from 'react';

import CustomTable from '../CustomTable/CustomTable';

import { FaUser, BiCalendarCheck } from 'react-icons/all';
import { comaSeparateNames } from '../../utilities/CommonMethods';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const UserAvalied = (props) => {

    const { tableHeadingsArray, data } = props;

    const returnCurrentMonth = (d) => {

        return new Date(d).getDate() + " / " + (new Date(d).getMonth() + 1)
        + ' / ' + new Date(d).getFullYear().toString().substr(-2)
	};

    const styleIcon = { fontSize: '12px', marginLeft: '4px' };

    return(

        <CustomTable headings={tableHeadingsArray}>
            <tr>
                <td>{ data?.title }</td>
                <td>{ data?.about?.substring(0, 34) + "..." }</td>
                <td> { comaSeparateNames(data?.availablePreferences) } </td>
                <td>
                    { returnCurrentMonth(data?.startDate) + ' - ' + returnCurrentMonth(data?.endDate) }
                </td>
                <td>
                    <div className="app-flex-row align-items-center">
                        <span className="mr-1">{ data?.peoplePerPackage }</span>
                        <span className="mb-1"><FaUser style={styleIcon} /></span>
                        <span className="ml-2 mr-1">{ data?.durationDays }</span>
                        <span className="mb-1"><BiCalendarCheck style={styleIcon} /></span>
                    </div>
                </td>
            </tr>
        </CustomTable>

    );

}

export default UserAvalied;
