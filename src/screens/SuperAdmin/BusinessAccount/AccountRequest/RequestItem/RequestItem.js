import React from 'react';
import './RequestItem.css';

import BusinessAccountData from '../../../../../components/BusinessAccountData/BusinessAccountData';

const RequestItem = (props) => {

    const { showRequest, account } = props;

    return(

        <div className="request-item app-flex-row align-items-start justify-content-between text-white"
        onClick={() => showRequest(account)}>

            <div className="request-item-left">
                
                <img alt="" src={account?.logo} className="rounded" />

                <BusinessAccountData 
                    businessName={account?.name} 
                    location={account?.address?.streetAddress}
                    email={account?.email}
                    phone={account?.contactNumber}
                />

            </div>

            <div>
                Request Date: { new Date(account?.createdAt).toLocaleDateString() }
            </div>

        </div>

    );

}

export default RequestItem;