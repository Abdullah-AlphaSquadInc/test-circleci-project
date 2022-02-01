import React, { useState, Fragment, useEffect } from 'react';
import './Reports.css';

import ListItem from '../../../components/ListItem/ListItem';
import ReportDetail from './ReportDetail/ReportDetail';

import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';
import { MdReport } from 'react-icons/md';

import GetRecordsRender from '../../../components/GetRecords/GetRecords';

import { Loading } from '../../../components/Loading/Loading';
import firebase from '../../../helpers/firebaseHelpers';

const Reports = () => {

    const [reportItem, setReportItem] = useState(undefined);
    const [showDetail, setShowDetail] = useState(false);

    const [ loadReports, setLoadReports ] = useState(false);
    const [ allReports, setAllReports ] = useState([]);

    useEffect(() => {        
        getAllReports();
    }, []);

    const showReportDetail = (flag, detail) => {
        setShowDetail(flag);
        setReportItem(detail);
        setLoadReports(false);
    }

    const getAllReports = () => {
        
        setLoadReports(true);

        firebase.getRecordsWithCollection("Reports", (res) => {
            
            const { success, data } = res;
            showReportDetail(false, undefined);

            if(success){
                setAllReports(data);
            } else{
                setAllReports([]);
            }

        });
    }

    const banUser = (report) => {
        let docName = report?.reportedTo?.userUID;
        let data = { isBanned: true };

        firebase.updateRecordsWithCollection("UserRecords", docName, data, (res) => {
            getAllReports();
        });
    }

    return(

        <Fragment>
            
            <TopBar icon={<MdReport className="side-icons mr-2" />} heading="reports" />

            <ChildrenContainer>

                <div className="app-flex-column bg-lightSecondary w-100 pt-3 px-3 rounded-lg">   

                    {
                        showDetail ?
                            <ReportDetail report={reportItem} closeDetail={() => showReportDetail(false, undefined)} 
                            banUser={(report) => banUser(report)} />
                        :
                        <GetRecordsRender loader={loadReports} arr={allReports}>
                            {
                                allReports?.length > 0 && allReports.map((rep, index) => (
                                    <ListItem key={index} user={rep} report={true} reportData={true}
                                        onClick={(detail) => showReportDetail(true, detail)} 
                                    />
                                ))
                            }
                        </GetRecordsRender>
                    }

                </div>

            </ChildrenContainer>
        
        </Fragment>

    );

}

export default Reports;