import React, { useState, useEffect, useRef } from 'react';

import { FaTimes, MdLocationOn, HiPencil } from 'react-icons/all';

import { WrapperFields } from '../../../../components/WrapperFields/WrapperFields';
import { Input } from '../../../../components/Input/Input';

const EditProfile = (props) => {
    
    const { closeForm, getFormValues, account } = props;

    const businessNameRef = useRef(null);

    const [businessLogo,setBusinessLogo] = useState(undefined);
    const [businessName,setBusinessName] = useState('');
    const [address,setAddress] = useState('');
    const [emailAddress,setEmailAddress] = useState('');
    const [contactNum,setContactNum] = useState('');
    const [website,setWebsite] = useState('');
    const [plan,setPlan] = useState('');
    const [information,setInformation] = useState('');


    useEffect(() => {
        const { current } = businessNameRef;
        if(current){
            current.focus();
        }
    }, []);

    useEffect(() => {
        if(account !== undefined){
            setValues();
        }
    }, [account]);

    useEffect(() => {
        const data = {
                address: { coordinates: account?.address?.coordinates, 
                streetAddress: address }, logo: businessLogo, website, email: emailAddress, 
                contactNumber: contactNum, subscriptionPlan: plan, name: businessName, about: information
            };
        getFormValues(data);
        
    }, [businessLogo, website, emailAddress, contactNum, plan, businessName, information]);

    const setValues = () => {
        setBusinessLogo({ src: account?.logo });
        setBusinessName(account?.name);
        setAddress(account?.address?.streetAddress);
        setWebsite(account?.website);
        setEmailAddress(account?.email);
        setContactNum(account?.contactNumber);
        setPlan(account?.subscriptionPlan);
    }

    const addImg = (e) => {
        let file = e.target.files[0];
        if (file === undefined) {
            console.log("null selected");
            return null;
        } 
        else{
            let reader = new FileReader();

            reader.onloadend = () => {
                setBusinessLogo({ src: reader.result, name: file.name, image: file });
            };

            reader.readAsDataURL(e.target.files[0], 'img');
        }

    }

    return(

        <div className="account-edit-form change-password app-flex-column position-relative p-3 mh-100 overflow-auto">

            <FaTimes className="close-icon mr-2 mt-2" onClick={closeForm} />
            
            <WrapperFields width="540px">
                <span className="fields-labels">Business Logo</span>                    

                <div className="w-100">

                    {
                        businessLogo !== undefined &&
                        <div className="w-100 position-relative">

                            <img alt="" src={businessLogo?.src} width="220px" height="160px" 
                            style={{ borderRadius: '12px' }} />

                            <label>
                                <HiPencil className="add-business-logo-icon" />
                                <input type="file" className="d-none" onChange={(e) => addImg(e)} />
                            </label>

                        </div>
                    }

                </div>
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Business Name</span>                    

                <Input placeholder="Business Name" value={businessName} inputref={businessNameRef} type="text"
                    onChange={(e) =>setBusinessName(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Address</span>                    

                <div className="position-relative w-100 mr-2">
                    <Input placeholder="Address" value={address} type="text"
                        onChange={(e) =>setAddress(e.target.value)} className="custom-input-field fields-backgruond pr-5"
                    />
                    <MdLocationOn className="gr-addressloc-icon position-absolute" />
                </div>

            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Contact Number</span>                    

                <Input placeholder="Contact Number" value={contactNum} type="text"
                    onChange={(e) =>setContactNum(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Email Address</span>                    

                <Input placeholder="Email Address" value={emailAddress} type="text"
                    onChange={(e) =>setEmailAddress(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Website</span>                    

                <Input placeholder="Website" value={website} type="text"
                    onChange={(e) => setWebsite(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Subscription Plan</span>                    

                <Input placeholder="Subscription Plan" value={plan} type="text"
                    onChange={(e) =>setPlan(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                />
            </WrapperFields>
            <WrapperFields width="540px">
                <span className="fields-labels">Information</span>                    

                <Input placeholder="Information" value={information} type="text"
                    onChange={(e) => setInformation(e.target.value)} className="custom-input-field fields-backgruond mr-2 "
                />
            </WrapperFields>

        </div>

    );

}
 
export default EditProfile;