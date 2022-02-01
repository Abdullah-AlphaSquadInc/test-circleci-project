import React, { useState, Fragment, useEffect } from 'react';
import './Services.css';

import { VscSettings } from 'react-icons/vsc';
import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import BusinessAccountData from '../../../components/BusinessAccountData/BusinessAccountData';
import {TopBar} from '../../../components/TopBar/TopBar';
import TwoColumnLayout from '../../../components/TwoColumnLayout/TwoColumnLayout';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { servicesTableHeading } from '../../../Assets/Data';
import GetRecordsRender from '../../../components/GetRecords/GetRecords';
import UserAvalied from '../../../components/userAvalied/userAvalied';
import firebase from '../../../helpers/firebaseHelpers';

import fire from '../../../config/firebase';
import { uploadFirebaseImage } from '../../../utilities/CommonMethods';

import EditService from './EditService/EditService';
import PreviewService from './PreviewService/PreviewService';
import PromotionList from '../../../components/PromotionList/PromotionList';

const storage = fire.storage();

const Services = () => {

    const [ editServiceDetail, setEditServiceDetail ] = useState(false);
    const [ editService, setEditService ] = useState(undefined);
    const [ currentEditService, setCurrentEditService ] = useState({ data: {}, promoId: '' });
    const [ previewService, setPreviewService ] = useState(false);

    const [ getBusinessAccount, setGetBusinessAccount ] = useState(false);
    const [myAccount, setMyAccount] = useState([]);

    const [ loadPromotions, setLoadPromotions ] = useState(false);
    const [ promotions, setPromotions] = useState([]);
    const [ preferences, setPreferences] = useState([]);

    const businessAccountID = localStorage.getItem('businessAccountId');
    const [ allUrls, setAllUrls ] = useState([]);

    useEffect(() => {        
        getBusinessAccounts();
    }, []);

    useEffect(() => {        
        publishPromotion();
    }, [allUrls]);

    const getBusinessAccounts = () => {
        
        setGetBusinessAccount(true);

        firebase.getRecordsWithCollection("Preferences", (res) => {
            setPreferences(res?.data);
        });

        firebase.getRecordsWithCollection("BusinessAccounts", (res) => {
            
            const { success, data } = res;
            
            setGetBusinessAccount(false);

            if(success){
                const result = data?.filter((us) => us?.accountId === businessAccountID);
                setMyAccount(result);
                getPromotions(result[0]?.id);
            } else{
                setMyAccount([]);
            }

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

    const setCurrentService = (flag, service) => {
        setEditServiceDetail(flag);   
        setEditService(service);
    }

    const deletePromoPreference = (promo, id) => {
        let docName = promo?.id;
        // let data = { availablePreferences: promo?.availablePreferences?.filter((ids) => ids !== id) };
        
        firebase.deleteRecordsWithCollection("Promotions", docName, (res) => {
            getPromotions(myAccount[0]?.id);
        });

        // firebase.updateRecordsWithCollection("Promotions", docName, data, (res) => {
        //     getPromotions(myAccount[0]?.id);
        // });
    };

    const saveImagesToFirebase = () => {
        const { data } = currentEditService;

        if(!data?.images?.length){
            alert('plz select image');
        } else if(!data?.startDate || !data?.endDate){
            alert('plz select start or end date');
        } else{

            for(let i=0; i < data?.images.length; i++){
                const { image, src } = data?.images[i];
    
                if(image){
                    uploadFirebaseImage(storage, image, (url) => {
                        setAllUrls(allUrls => [...allUrls, url]);
                    });
                }
                else{
                    setAllUrls(allUrls => [...allUrls, src]);
                }               
    
            }

        }

    }

    const publishPromotion = () => {
        const { data, promoId } = currentEditService;

        if(allUrls.length === data?.images?.length && allUrls.length > 0){
            
            data['businessId'] = myAccount[0]?.id;
            data['images'] = allUrls;

            if(editService === undefined){
                data['usersWhoAvailed'] = [];
                data['rating'] = 0;
                data['address'] = myAccount[0]?.address;
                firebase.setRecordsWithCollection("Promotions", "", data, (res) => {
                    setAllUrls([]);
                    setEditServiceDetail(false);
                    getBusinessAccounts();
                });
            } else{
                firebase.updateRecordsWithCollection("Promotions", promoId, data, (res) => {
                    setAllUrls([]);
                    setEditServiceDetail(false);
                    getBusinessAccounts();
                });   
            }
        }
    }

    return(

        <Fragment>
            
            <TopBar icon={<VscSettings className="side-icons mr-2" />} heading="services" 
             showButtons={editServiceDetail} title1="preview" title2="publish" 
             buttonsClassName="profile-info-button services-top-buttons"
             getButton1Click={() => setPreviewService(true)}
             getButton2Click={() => saveImagesToFirebase()}
            />

            <ChildrenContainer>

                <GetRecordsRender loader={getBusinessAccount} arr={myAccount}>

                    { 
                        editServiceDetail ? 
                        <EditService closeService={() => setEditServiceDetail(false)} 
                         editService={editService} getData={(data) => setCurrentEditService(data)} />
                        :
                        <TwoColumnLayout 
                            leftSide={
                                myAccount?.length &&
                                <>
                                    <img alt="" src={myAccount[0]?.logo} width="100%" />
                                    <BusinessAccountData 
                                        businessName={myAccount[0]?.name} 
                                        showRating rating={promotions[0]?.rating} />
                                </>
                            }
                        >
                            
                            { (promotions?.length === 0 && !loadPromotions) && <div>
                                <PromotionList 
                                    icon={false}
                                    heading={`Promotions`} addNew={true}
                                    addNewClick={() => setCurrentService(true, undefined)} 
                                />
                            </div> }

                            <GetRecordsRender loader={loadPromotions} arr={promotions}>
                                
                                {
                                    promotions?.length ?
                                    promotions?.map((promo, i) => (
                                        <PromotionList 
                                            key={i} icon={false}
                                            heading={`Promotions`} addNew={true}
                                            addNewClick={() => setCurrentService(true, undefined)}
                                            text={
                                                preferences?.length &&
                                                preferences?.filter((pre) => promo?.availablePreferences.includes(pre?.name))
                                                ?.map((pre, ind) => (
                                                    <PromotionList key={ind} 
                                                        heading={pre?.category}
                                                        showEditDelete={true}
                                                        editClick={() => setCurrentService(true, {promo, pre})}
                                                        deleteClick={() => deletePromoPreference(promo, pre?.id)}
                                                        text={
                                                            <UserAvalied tableHeadingsArray={servicesTableHeading} 
                                                                data={promo}
                                                            />
                                                        }
                                                    />
                                                ))
                                            }
                                        />
                                    )) : null
                                }

                            </GetRecordsRender>

                        </TwoColumnLayout>
                    }
            
                </GetRecordsRender>

            </ChildrenContainer>

            { currentEditService !== undefined &&
                <CustomModal show={previewService} handleClose={() => setPreviewService(false)} 
                    title={ currentEditService?.data?.availablePreferences } >
                    <PreviewService service={currentEditService} />
                </CustomModal>
            }

        </Fragment>

    );

}

export default Services;