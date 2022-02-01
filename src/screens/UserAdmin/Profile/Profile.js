import React, { useState, Fragment,useEffect  } from 'react';
import './Profile.css';

import BusinessAccountData from '../../../components/BusinessAccountData/BusinessAccountData';
import TwoColumnLayout from '../../../components/TwoColumnLayout/TwoColumnLayout';
import { GetButtons } from '../../../components/getButtons/getButtons';
import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';
import { FaRegUserCircle } from 'react-icons/fa';

import EditProfile from './EditProfile/EditProfile';
import ShowInformation from './ShowInformation/ShowInformation';
import ShowReviews from './ShowReviews/ShowReviews';

import GetRecordsRender from '../../../components/GetRecords/GetRecords';
import firebase from '../../../helpers/firebaseHelpers';
import { Button } from 'react-bootstrap';

import fire from '../../../config/firebase';
import { uploadFirebaseImage } from '../../../utilities/CommonMethods';
const storage = fire.storage();

const Profiles = (props) => {

    const [showInfo, setShowInfo] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [addNewAccountForm, setAddNewAccountForm] = useState(false);

    const [ getBusinessAccount, setGetBusinessAccount ] = useState(false);
    const [myAccount, setMyAccount] = useState([]);

    const [ loadUserReviews, setLoadUserReviews ] = useState(false);
    const [userReviews, setUserReviews] = useState([]);

    const [btnLoading, setBtnLoading] = useState(false);
    const [formData, setFormData] = useState(undefined);

    const businessAccountID = localStorage.getItem('businessAccountId');

    const activeSection = (num) => {
        setShowInfo(num);
    }

    useEffect(() => {        
        getBusinessAccounts();
    }, []);

    const getBusinessAccounts = () => {
        
        setGetBusinessAccount(true);

        firebase.getRecordsWithCollection("BusinessAccounts", (res) => {
            
            const { success, data } = res;
            
            setGetBusinessAccount(false);
            setAddNewAccountForm(false);
            setShowForm(false);

            if(success){
                const result = data?.filter((us) => us?.accountId === businessAccountID);
                setMyAccount(result);
                getUserReview(result[0]?.id);
            } else{
                setMyAccount([]);
            }

        });
    }

    const getUserReview = (id) => {
        
        setLoadUserReviews(true);

        firebase.getRecordsWithCollection("Reviews", (res) => {
            
            const { success, data } = res;
            
            setLoadUserReviews(false);

            if(success){
                const result = data?.filter((us) => us?.businessAccountId === id);
                setUserReviews(result);
            } else{
                setUserReviews([]);
            }

        });
    }

    const addNewBusinessAccount = () => {
        setAddNewAccountForm(true);
    }

    const closeForm = () => {
        setShowForm(false);
        setAddNewAccountForm(false);
        setBtnLoading(false);
    }

    const editMyBusinessAccount = () => {
        setBtnLoading(true);
        if(formData !== undefined){
            const { image } = formData?.logo;
            if(image){
                uploadFirebaseImage(storage, image, (url) => {
                    formData['logo'] = url;
                    updateBusinessData(formData);                    
                });
            } else{
                formData['logo'] = formData?.logo?.src;
                updateBusinessData(formData);
            }
        }
    }

    const updateBusinessData = (data) => {
        firebase.updateRecordsWithCollection("BusinessAccounts", myAccount[0]?.id, data, (res) => {
            console.log(res);

            setBtnLoading(false);
            getBusinessAccounts();
        });
    }

    return(
        
        <Fragment>
            
            <TopBar icon={<FaRegUserCircle className="side-icons mr-2" />} heading="profile" 
             singleButton={ addNewAccountForm || showForm } 
             title1={ showForm ? 'Save' : '' } 
             singleButtonClick={() => editMyBusinessAccount()}
             singleButtonLoading={btnLoading}
            />

            <ChildrenContainer>
                        
                <GetRecordsRender loader={getBusinessAccount} arr={myAccount}>

                {
                    showForm ? 
                    <div className="bg-lightSecondary rounded-lg w-100 p-0 h-100">
                        <EditProfile closeForm={() => closeForm()} account={myAccount[0]} getFormValues={(values) => setFormData(values)} />
                    </div>
                    :
                
                    <TwoColumnLayout
                        onClick={() => myAccount?.length && setShowForm(true)} 
                        leftSide={
                            myAccount?.length ? <>
                                    
                                    <img alt="" src={myAccount[0]?.logo} width="100%" />
                                    <h4 className="text-capitalize py-2">
                                        { myAccount[0]?.name }
                                    </h4>

                                    <BusinessAccountData smallHeading
                                        businessName={myAccount[0]?.subscriptionPlan} 
                                        location={myAccount[0]?.address?.streetAddress}
                                        email={myAccount[0]?.email}
                                        phone={myAccount[0]?.contactNumber}
                                        time={ myAccount[0]?.operatingHours?.openTime + ' - ' + myAccount[0]?.operatingHours?.closeTime }
                                    />
                                </>
                            : null
                        }
                    >

                        <GetRecordsRender loader={loadUserReviews} arr={userReviews}>
                            {
                                myAccount?.length &&
                                <div className="two-column-layout-right mh-100 overflow-auto p-2">
                                
                                    <GetButtons title1="information" title2={`reviews (${userReviews?.length})`} 
                                    className={`top-detail-buttons ${ showInfo === 1 ? 'top-detail-button1-active' : showInfo === 2 ? 
                                        'top-detail-button2-active' : 'top-detail-buttons' } 
                                    `} 
                                    click1={() => activeSection(1)} 
                                    click2={() => activeSection(2)}
                                    />

                                    {
                                        userReviews?.length ? userReviews?.map((review, index) => (
                                            showInfo === 1 ? <ShowReviews key={index} msg={review} /> :
                                            <ShowInformation key={index} review={review} />
                                        )) : null
                                    }

                                </div>
                            }
                        </GetRecordsRender>

                    </TwoColumnLayout>
                
                }

                </GetRecordsRender>
            
            </ChildrenContainer>
        </Fragment>
    );

}

export default Profiles;