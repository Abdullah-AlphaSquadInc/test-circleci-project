import React, { useEffect, useState } from 'react';
import './ViewAccount.css';

import { FaTimes } from 'react-icons/fa';
import { Images } from '../../../../../Assets/Images';
import BusinessAccountData from '../../../../../components/BusinessAccountData/BusinessAccountData';
import AccountItem from './AccountItem';
import TwoColumnLayout from '../../../../../components/TwoColumnLayout/TwoColumnLayout';

import GetRecordsRender from '../../../../../components/GetRecords/GetRecords';
import firebase from '../../../../../helpers/firebaseHelpers';

const ViewAccount = (props) => {

    const { closeViewLayout, userAccount, userId } = props;

    const [allPromotions, setAllPromotions] = useState([]);
    const [loadPromotions, setLoadPromotions] = useState(false);

    useEffect(() => {
        getBusinessPromotions();
    }, [userAccount])

    const getBusinessPromotions = () => {
        setLoadPromotions(true);

        firebase.getRecordsWithCollection('Promotions', (res) => {
            
            const { success, data } = res;
            setLoadPromotions(false);

            console.log(data);

            if(success){
                setAllPromotions(data?.filter((pro) => pro?.businessId === userAccount?.id));
            } else{
                setAllPromotions([]);
            }

        });
    }

    if(!userAccount)
        return <div className="text-white">No business account exist.</div>
    else
        return(

            <TwoColumnLayout 
                closeViewLayout={closeViewLayout}
                leftSide={
                        <>
                            <img alt="" src={userAccount?.logo} width="100%" />
                            <BusinessAccountData 
                                businessName={userAccount?.name} 
                                location={userAccount?.address?.streetAddress}
                                email={userAccount?.email}
                                phone={userAccount?.contactNumber}
                                time={new Date().toLocaleDateString()}
                            />
                        </>
                    }
            >

                <GetRecordsRender loader={loadPromotions} arr={allPromotions}>
                    {
                        allPromotions?.length > 0 && allPromotions.map((item, index) => (
                            <div className="two-column-layout-right mb-2" key={index}>
                                <AccountItem promotion={item} location={userAccount?.address?.streetAddress} />
                            </div>
                        ))
                    }
                </GetRecordsRender>

            </TwoColumnLayout>

        );

}

export default ViewAccount;