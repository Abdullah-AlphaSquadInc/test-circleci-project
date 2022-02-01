import React, { useState, Fragment, useEffect } from 'react';
import './Clients.css';

import { useHistory } from 'react-router-dom';
import TwoColumnLayout from '../../../components/TwoColumnLayout/TwoColumnLayout';
import { GetButtons } from '../../../components/getButtons/getButtons';
import GetRecordsRender from '../../../components/GetRecords/GetRecords';
import ClientAbout from './ClientAbout/ClientAbout';
import ClientMedical from './ClientMedical/ClientMedical';
import ClientPromotion from './ClientPromotion/ClientPromotion';
import { FaUserFriends } from 'react-icons/all';
import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';
import { Avatar } from '../../../components/Avatar/Avatar';
import { Button } from 'react-bootstrap';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { clientTableHeading } from '../../../Assets/Data';
import CustomAccordian from '../../../components/Accordian/Accordian';
import firebase from '../../../helpers/firebaseHelpers';
import ClientUser from './User/User';
import { Loading } from '../../../components/Loading/Loading';
import { Routes } from '../../../Routes/Routes';
import OptionsPopupCreateThread from './OptionsPopup/OptionsPopup';

const Client = () => {

    const history = useHistory();
    const [showInfo, setShowInfo] = useState(1);
    const [showClientDetail, setShowClientDetail] = useState(false);

    const [ loadPromotions, setLoadPromotions ] = useState(false);
    const [ promotions, setPromotions] = useState([]);
    const [ currentPromotion, setCurrentPromotion] = useState(undefined);

    const [ preferences, setPreferences] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ subCategories, setSubCategories] = useState([]);

    const [sendMessageLoading, setSendMessageLoading] = useState(false);
    const [allThreads, setAllThreads] = useState([]);

    const [ loadUser, setLoadUser] = useState(false);
    const [ allUsers, setAllUsers] = useState([]);

    const [ openModalThread, setOpenModalThread ] = useState(false);
    const [ openModalThreadUser, setOpenModalThreadUser ] = useState(undefined);

    const businessAccountID = localStorage.getItem('businessAccountId');
    const [ businessAccount, setBusinessAccount ] = useState(undefined);

    useEffect(() => {
        getInitialData();
    }, []);

    const getInitialData = () => {
        
        setLoadPromotions(true);

        firebase.getRecordsWithCollection("Preferences", (res) => {
            setPreferences(res?.data);
        });
        firebase.getRecordsWithCollection("Categories", (res) => {
            setCategories(res?.data);
        });
        firebase.getRecordsWithCollection("SubCategories", (res) => {
            setSubCategories(res?.data);
        });

        firebase.getRecordsWithCollection("BusinessAccounts", (res) => {
            const result = res?.data?.filter((us) => us?.accountId === businessAccountID);
            setBusinessAccount(result[0]);
            getPromotions(result[0]?.id);
        });

    }

    const getPromotions = (id) => {
        setLoadPromotions(true);

        firebase.getRecordsWithCollection("Promotions", (res) => {
            const { success, data } = res;
            setLoadPromotions(false);

            if(success){
                const result = data?.filter((us) => us?.businessId === id);
                setPromotions(result);
            } else{
                setPromotions([]);
            }
        });
    }

    const activeSection = (num) => {
        setShowInfo(num);
    }

    const selectUser = (data, promo) => {
        console.log(data);
        setLoadUser(true);
        setShowClientDetail(true);
        setCurrentPromotion(promo);
        firebase.getRecordsWithCollection("UserRecords", (res) => {
            const result = res?.data?.filter((user) => user?.id === data?.userId && user?.isAdmin === false);
            setAllUsers(result);
            setLoadUser(false);
        });
    }

    const sendMessageToUser = (user) => {
        setSendMessageLoading(true);
        firebase.getRecordsWithCollection("ChatThreads", (res) => {
            const { success, data } = res;
            setSendMessageLoading(false);
            if(success){
                const result = data?.filter((thread) => thread?.participants?.includes(user?.id));
                if(result?.length){
                    history.replace(Routes.messages);
                } else{
                    setOpenModalThread(true);
                    setOpenModalThreadUser(user);
                }
            }
         });
    }

    const getRenderDate = (d) => {
        return new Date(d).toDateString().split(' ').slice(1).join(' ');
    }

    return(

        <Fragment>
            
            <TopBar icon={<FaUserFriends className="side-icons mr-2" />} heading="clients" />

            <ChildrenContainer>

                { 
                    !showClientDetail ? 
                    <GetRecordsRender loader={loadPromotions} arr={promotions}>
                        { promotions.length > 0 && promotions?.map((promo, i) => (
                            <div className="bg-lightSecondary w-100 p-0 mh-50 overflow-auto" key={i}>
                                <CustomAccordian 
                                    transparent icon={false} 
                                    showValidity={ getRenderDate(promo?.startDate) + ' - ' + getRenderDate(promo?.endDate) }
                                    heading={promo?.title}
                                    text={
                                        <div className="app-flex-column w-100 text-white px-3">

                                            <div className="text-white w-100 app-flex-row align-items-center justify-content-between font-weight-bold">
                                            { clientTableHeading.map((head, i) => {
                                                return <span key={i} className="ml-5 pl-3">{head}</span>;
                                            })}
                                            </div>

                                            {
                                                promo?.usersWhoAvailed?.length ?
                                                promo?.usersWhoAvailed?.map((user, index) => (
                                                    <ClientUser 
                                                     data={{ name: user?.name, src: user?.profileImage, userId: user?.uid,
                                                        date: user?.dateAvailment, 
                                                        peoplePerPackage: promo?.peoplePerPackage, durationDays: promo?.durationDays 
                                                    }} 
                                                     key={index} 
                                                     onClick={(data) => selectUser(data, promo)} />
                                                )) : null
                                            }

                                        </div>
                                    }
                                />
                                
                            </div>
                        )) }
                    </GetRecordsRender>

                    :
                    <TwoColumnLayout
                        leftColor="white" 
                        leftSide={
                            <div className="app-flex-column align-items-center justify-content-center text-black pt-4 pb-2">
                                { loadUser ? <Loading size="sm" variant="black" /> :
                                  allUsers?.length === 0 ? 'No User Found.' :
                                    <>
                                        <Avatar name="name" src={allUsers[0]?.profileImage} large />
                                        <h4 className="py-2">Person Name</h4>
                                        <span>{allUsers[0]?.phoneNumber}</span>
                                        <span>{allUsers[0]?.address?.streetAddress}</span>
                                        <span>{allUsers[0]?.email}</span>
                                        <Button className="mt-3 font-weight-bold bg-skyblue text-black border-0 text-uppercase"
                                        onClick={() => sendMessageToUser(allUsers[0])}>
                                           { sendMessageLoading ? <Loading size="sm" variant="black" /> : 'Message' }
                                        </Button>
                                    </>
                                }
                            </div>
                        }
                    >

                        <div className="two-column-layout-right overflow-auto h-100 p-2">
                            { allUsers?.length ?
                                <>
                                <GetButtons title1="about the client" title2="medical information" title3="promotion availed" 
                                    className={`top-detail-buttons ${ showInfo === 1 ? 'top-detail-button1-active' : showInfo === 2 ? 
                                        'top-detail-button2-active' : showInfo === 3 ? 'top-detail-button3-active' : 'top-detail-buttons' } 
                                    `} 
                                    click1={() => activeSection(1)} 
                                    click2={() => activeSection(2)}
                                    click3={() => activeSection(3)}
                                />

                                {
                                    showInfo === 1 ? 
                                    <ClientAbout 
                                        arrayPreference={allUsers[0]?.arrayPreference} 
                                        preferences={preferences}
                                        categories={categories}
                                        subCategories={subCategories}
                                    /> 
                                    :
                                    showInfo === 2 ? <ClientMedical medical={allUsers[0]} /> :
                                    <ClientPromotion currentPromotion={currentPromotion} />

                                }
                                </> : <div className="py-2 text-center">{ !loadUser && 'No User Found.'}</div>
                            }

                        </div>

                    </TwoColumnLayout>
                }

            </ChildrenContainer>

            <CustomModal show={openModalThread} handleClose={() => setOpenModalThread(false)} title="Create Chat">
                <OptionsPopupCreateThread 
                    user={openModalThreadUser} 
                    handleClose={() => {
                        setOpenModalThread(false);
                        history.replace(Routes.messages);
                    }} 
                    sender={businessAccount}
                />
            </CustomModal>

        </Fragment>

    );

}

export default Client;