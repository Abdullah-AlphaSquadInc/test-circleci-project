import React, { useState, Fragment, useEffect } from 'react';
import './BusinessAccount.css';

import { useHistory } from 'react-router-dom';

import ListItem from '../../../components/ListItem/ListItem';

import { Routes } from '../../../Routes/Routes';

import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';
import GetRecordsRender from '../../../components/GetRecords/GetRecords';
import { MdAccountBalance } from 'react-icons/md';

import firebase from '../../../helpers/firebaseHelpers';
import { filterRecordByName } from '../../../utilities/CommonMethods';

const BusinessAccounts = () => {

    const history = useHistory();

    const [loadAccounts, setLoadAccounts] = useState(false);
    const [allAccounts, setAllAccounts] = useState([]);
    const [allAccountsCopy, setAllAccountsCopy] = useState([]);
    const [ searchValue, setSearchValue ] = useState('');

    useEffect(() => {        
        viewAllApprovedAccounts();
    }, []);

    const viewAllApprovedAccounts = () => {
        
        setLoadAccounts(true);

        firebase.getRecordsWithCollection("BusinessAccounts", (res) => {
            
            const { success, data } = res;
            setLoadAccounts(false);            

            if(success){
                const result = data.filter((account) => account?.isApproved === true);
                setAllAccounts(result);
                setAllAccountsCopy(result);
            } else{
                setAllAccounts([]);
            }

        });
    }

    const viewShowRequests = (user) => {
        history.replace(`/${Routes.businessAccounts}/view/${user?.id}`);
    }

    const deActivateAccount = (user) => {
        let docName = user?.id;

        let data = { isApproved: false };

        firebase.updateRecordsWithCollection("BusinessAccounts", docName, data, (res) => {
            viewAllApprovedAccounts();
        });
    }

    const filterAccounts = (val) => {
        setAllAccounts(filterRecordByName(allAccounts, allAccountsCopy, val));
    }

    return(

        <Fragment>
            
            <TopBar icon={<MdAccountBalance className="side-icons mr-2" />} 
                heading="business accounts" 
                singleButton title1="view account requests"
                singleButtonClick={() => viewShowRequests({ id: 'account-requests' })}
                pressEnter={() => filterAccounts(searchValue)}
                showSearch searchValue={searchValue} 
                changeSearch={(val) => {
                    setSearchValue(val);
                    filterAccounts(val);
                }}
            />

            <ChildrenContainer>

                <div className="app-flex-column bg-lightSecondary w-100 pt-3 px-3 rounded-lg">

                    <GetRecordsRender loader={loadAccounts} arr={allAccounts}>
                        {
                            allAccounts?.length > 0 && allAccounts.map((user, index) => (
                                <ListItem key={index} 
                                    onClick={(user) => viewShowRequests(user)}
                                    businessAccButtons={true} user={user}
                                    clickView={(user) => viewShowRequests(user)}
                                    deActivateAccount={(user) => deActivateAccount(user)}
                                />
                            ))
                        }
                    </GetRecordsRender>

                </div>
            
            </ChildrenContainer>

        </Fragment>

    );

}

export default BusinessAccounts;