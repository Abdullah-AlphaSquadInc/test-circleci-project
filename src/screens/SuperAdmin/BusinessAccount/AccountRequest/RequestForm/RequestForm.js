import React, {useState, useEffect} from 'react';
import './RequestForm.css';

import { FaTimes, MdLocationOn } from 'react-icons/all';
import { WrapperFields } from '../../../../../components/WrapperFields/WrapperFields';
import { Input } from '../../../../../components/Input/Input';

const RequestForm = (props) => {

    const { closeForm, accountItem, getData } = props;

    const [businessLogo,setBusinessLogo] = useState('');
    const [businessName,setBusinessName] = useState('');
    const [address,setAddress] = useState('');
    const [emailAddress,setEmailAddress] = useState('');
    const [contactNum,setContactNum] = useState('');
    const [website,setWebsite] = useState('');
    const [plan,setPlan] = useState('');
    const [username,setUsername] = useState('');
    const [tempPass,setTempPass] = useState('');


    useEffect(() => {
        
        if(accountItem !== undefined){
            setValues();
        }

    }, [accountItem]);

    useEffect(() => {
        getData({ id: accountItem?.id, data: { username, tempPass } });
    }, [username, tempPass]);

    const setValues = () => {

        setBusinessLogo(accountItem?.logo);
        setBusinessName(accountItem?.name);
        setAddress(accountItem?.address?.streetAddress);
        setEmailAddress(accountItem?.email);
        setContactNum(accountItem?.contactNumber);
        setWebsite(accountItem?.website);
        setPlan(accountItem?.subscriptionPlan);

        getData({ id: accountItem?.id, data: { username, tempPass } });
    }

    return(

        <div className="account-request-form change-password app-flex-column position-relative py-3">

            <FaTimes className="close-icon" onClick={closeForm} />
            
            <WrapperFields width="540px">
                <span className="fields-labels">Business Logo</span>                    

                <div style={{ width: '100%' }}>   
                    <img alt="" src={businessLogo} width="220px" height="160px" className="rounded" />
                </div>
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Business Name</span>                    

                <Input placeholder="Business Name" value={businessName} type="text" readOnly={true}
                    onChange={(e) =>setBusinessName(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Address</span>                    

                <div className="position-relative w-100 mr-2">
                    <Input placeholder="Address" value={address} type="text" readOnly={true}
                        onChange={(e) =>setAddress(e.target.value)} className="custom-input-field fields-backgruond"
                    />
                    <MdLocationOn className="gr-addressloc-icon" />
                </div>

            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Contact Number</span>                    

                <Input placeholder="Contact Number" value={contactNum} type="text" readOnly={true}
                    onChange={(e) =>setContactNum(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Email Address</span>                    

                <Input placeholder="Email Address" value={emailAddress} type="text" readOnly={true}
                    onChange={(e) =>setEmailAddress(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Website</span>                    

                <Input placeholder="Website" value={website} type="text" readOnly={true}
                    onChange={(e) => setWebsite(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Subscription Plan</span>                    

                <Input placeholder="Website" value={plan} type="text" readOnly={true}
                    onChange={(e) => setPlan(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Temporary Email</span>                    

                <Input placeholder="Temporary Email" value={username} type="text" readOnly={false}
                    onChange={(e) => setUsername(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Temporary Password</span>                    

                <Input placeholder="Temporary Password" value={tempPass} type="text" readOnly={false}
                    onChange={(e) => setTempPass(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>

        </div>

    );

}

export default RequestForm;