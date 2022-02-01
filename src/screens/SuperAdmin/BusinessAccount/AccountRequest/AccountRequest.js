import React, { useState, Fragment, useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';

import ChildrenContainer from '../../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../../components/TopBar/TopBar';
import { MdAccountBalance } from 'react-icons/md';

import RequestItem from './RequestItem/RequestItem';
import RequestForm from './RequestForm/RequestForm';
import ViewAccount from './ViewAccount/ViewAccount';
import { Routes } from '../../../../Routes/Routes';
import { Button } from 'react-bootstrap';
import { Input } from '../../../../components/Input/Input';
import { Loading } from '../../../../components/Loading/Loading';
import GetRecordsRender from '../../../../components/GetRecords/GetRecords';

import firebase from '../../../../helpers/firebaseHelpers';
import CustomModal from '../../../../components/CustomModal/CustomModal';

const AccuontRequest = () => {

    const history = useHistory();

    const { id } = useParams();

    const [ showRequestLayout, setShowRequestLayout ] = useState(false);

    const [ showAccountLayout, setShowAccountLayout ] = useState(false);

    const [accountItem, setAccountItem] = useState(undefined);
    const [accountData, setAccountData] = useState(undefined);

    const [loadAccounts, setLoadAccounts] = useState(false);
    const [allAccounts, setAllAccounts] = useState([]);

    const [showModal,setShowModal] = useState(false);
    const [rejectedInput,setRejectedInput] = useState('');
    const [rejectedLoading,setRejectedLoading] = useState(false);

    useEffect(() => {        
        if(id === Routes.requestId){
            visiableLayout(false, false, false);
        } else{
            visiableLayout(true, false, true);
        }
    }, [id]);

    const visiableLayout = (flag1, flag2, flagRecord) => {
        setShowAccountLayout(flag1);
        setShowRequestLayout(flag2);
        viewAllRequestedAccounts(flagRecord);
    }

    const viewAllRequestedAccounts = (flagRecord) => {        
        setLoadAccounts(true);

        let collectionName = 'BusinessAccounts';

        firebase.getRecordsWithCollection(collectionName, (res) => {
            
            const { success, data } = res;
            
            if(success){
                setCurrentAccount(data, flagRecord);
            } else{
                setAllAccounts([]);
            }

        });
    }

    const setCurrentAccount = (data, flagRecord) => {
        setLoadAccounts(false);            
        setAccountItem(undefined);
        setAccountData(undefined);

        if(!flagRecord){
            setAllAccounts(data.filter((acc) => acc?.isApproved === false && acc?.rejectionReason === ""));
        } else{
            setAllAccounts(data.filter((user) => user?.id === id));
        }
    }

    const addAccount = () => {

        const { id, data } = accountData;
        
        if(!data?.username || !data?.tempPass){
            alert('plz type email & password');
        } else{

            firebase.signUp(data?.username, data?.tempPass, (res) => {

                if(res?.success){
                    let docName = id;
                    let dataResult = { isApproved: true, accountId: res?.data?.uid };
            
                    firebase.updateRecordsWithCollection('BusinessAccounts', docName, dataResult, (res) => {
                        visiableLayout(false, false, false); 
                    });

                } else{
                    alert('something went wrong!');
                }

            });

        }
    }

    const deleteAccount = () => {
        if(rejectedInput){
            setRejectedLoading(true);
            const { id, data } = accountData;
            let docName = id;
            let dataResult = { isApproved: false, rejectionReason: rejectedInput };

            firebase.updateRecordsWithCollection('BusinessAccounts', docName, dataResult, (res) => {
                visiableLayout(false, false, false); 
            });
        }
    }


    if(!id)
        return <Redirect exact to={`/${Routes.businessAccounts}`} />

    else
        return(

            <Fragment>
                
                <TopBar icon={<MdAccountBalance className="side-icons mr-2" />} 
                    heading={ showAccountLayout ? 'view Business Accounts' : 'Business Accounts Request'} 
                    showButtons={showRequestLayout} title1="Add account" title2="delete request"
                    buttonsClassName="account-request-buttons"
                    getButton1Click={addAccount} getButton2Click={() => setShowModal(true)}
                />

                <ChildrenContainer>

                    <GetRecordsRender loader={loadAccounts} arr={allAccounts}>

                        {
                            (!showRequestLayout && showAccountLayout) ?    
                                <ViewAccount userAccount={allAccounts[0]} userId={id}
                                    closeViewLayout={() => {
                                        setShowAccountLayout(false);
                                        history.replace('/'+Routes.businessAccounts);
                                    }}
                                />
                            :

                            <div className="app-flex-column bg-lightSecondary w-100 h-100 overflow-auto pt-3 px-3 rounded-lg">

                                {   
                                    (!showRequestLayout && !showAccountLayout) ?
                                        allAccounts?.length > 0 && allAccounts.map((account, index) => (
                                            <RequestItem key={index} account={account} 
                                                showRequest={(detail) => {
                                                    setAccountItem(detail);
                                                    setShowRequestLayout(true);
                                                }} 
                                            />
                                        ))
                                    : (showRequestLayout && !showAccountLayout) ?    
                                        <RequestForm 
                                            accountItem={accountItem} 
                                            closeForm={() => {
                                                setShowRequestLayout(false);
                                                setAccountData(undefined);
                                            }} 
                                            getData={(data) => setAccountData(data)}
                                        />
                                    :  null   
                                }

                            </div>
                        }

                    </GetRecordsRender>
                    
                </ChildrenContainer>

                <CustomModal
                show={showModal} handleClose={() => setShowModal(false)} 
                title={`Rejected Reason`}
                >
                    <Input placeholder="Enter rejected reason" value={rejectedInput} 
                        onChange={(e) => setRejectedInput(e.target.value)}
                        className="custom-input-field fields-backgruond mb-1" 
                        pressEnter={(e) => deleteAccount()}    
                    />

                    <div className="mt-3 justify-content-center app-flex-row">
                        <Button className="text-black bg-skyblue border-0" 
                            onClick={deleteAccount}>
                                { rejectedLoading ? <Loading size="sm" variant="black" /> : 'Reject Account' }
                        </Button>
                    </div>
                </CustomModal>

            </Fragment>

        );

}

export default AccuontRequest;