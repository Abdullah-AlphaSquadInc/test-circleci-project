import React from 'react';

import './ReportDetail.css';
import ListItem from '../../../../components/ListItem/ListItem';
import { FaTimes } from 'react-icons/fa';

import { GetButtons } from '../../../../components/getButtons/getButtons';

const ReportDetail = (props) => {

    const { closeDetail, report, banUser } = props;

    return(

        <div className="report-detail app-flex-column position-relative py-3">

            <FaTimes className="close-icon" onClick={closeDetail} />

            <ListItem user={report} />

            <GetButtons title1="ban this user" className="report-detail-buttons" 
             click1={() => banUser(report)} 
            />

            <p className="text-white pt-2 pb-4">
                { report?.message }   
            </p>

            <div className="app-flex-row align-items-center">
                {
                    report?.attachments?.length ?
                        report?.attachments?.map((attach, index) => (
                            <img alt="attachment" width="250px" height="200px" className="rounded"
                            key={index} className="mr-4" src={attach} />
                        ))
                    : null
                }
            </div>

        </div>

    );

}

export default ReportDetail;