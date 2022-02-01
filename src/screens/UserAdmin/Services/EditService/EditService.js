import React, { useState, useEffect } from 'react';
import './EditService.css';

import { FaTimes, FaPlus } from 'react-icons/fa';

import { WrapperFields } from '../../../../components/WrapperFields/WrapperFields';
import { Input } from '../../../../components/Input/Input';
import CustomDropdown from '../../../../components/Dropdown/Dropdown';
import PreferenceData from '../../../../components/PreferenceData/PreferenceData';
import firebase from '../../../../helpers/firebaseHelpers';
import { dateToUnixStamp, returnDate, getAboutClientData, comaSeparateNames } from '../../../../utilities/CommonMethods';

const EditService = (props) => {

    const { closeService, editService, getData } = props;

    const [ preferences, setPreferences] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ subCategories, setSubCategories] = useState([]);
 
    const [images, setImages] = useState([]);
    const [ availablePreferences, setAvailablePreferences] = useState([]);

    const [category,setCategory] = useState('');
    const [title,setTitle] = useState('');
    const [about,setAbout] = useState('');
    const [guidelines,setGuidelines] = useState('');

    const [duration,setDuration] = useState('');
    const [poeplePerPackage, setPoeplePerPackage] = useState('');
    const [packagePrice, setPackagePrice] = useState('');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [termsConditions,setTermsConditions] = useState('');

    useEffect(() => {
        loadCategories();
        if(editService !== undefined){
            setValues();
        }
    }, [editService]);

    useEffect(() => {
        backChangeToValues();
    }, [availablePreferences, images, startDate, endDate, category, title, about, guidelines, termsConditions, packagePrice, poeplePerPackage, duration]);

    const loadCategories = () => {
        firebase.getRecordsWithCollection("Preferences", (res) => {
            setPreferences(res?.data);
        });
        firebase.getRecordsWithCollection("Categories", (res) => {
            setCategories(res?.data);
        });
        firebase.getRecordsWithCollection("SubCategories", (res) => {
            setSubCategories(res?.data);
        });
    }

    const setValues = () => {
        console.log(editService);

        setCategory(editService?.pre?.category);
        setTitle(editService?.promo?.title);
        setAbout(editService?.promo?.about);
        setGuidelines(editService?.promo?.guidelines);
        setDuration(editService?.promo?.durationDays);
        setPoeplePerPackage(editService?.promo?.peoplePerPackage);
        setPackagePrice(editService?.promo?.price);
        setStartDate(returnDate(editService?.promo?.startDate));
        setEndDate(returnDate(editService?.promo?.endDate));
        setTermsConditions(editService?.promo?.termsAndConditions);
        setImages(editService?.promo?.images?.map((img) => { return { src: img } }));
        setAvailablePreferences(editService?.promo?.availablePreferences);

        backChangeToValues();
    }

    const backChangeToValues = () => {
        const data = {
            images, startDate: dateToUnixStamp(startDate), endDate: dateToUnixStamp(endDate), title, about, guidelines, termsAndConditions: termsConditions,
            price: packagePrice, peoplePerPackage: poeplePerPackage, durationDays: duration, availablePreferences
        }

        getData({ data, promoId: editService?.promo?.id });
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
                setImages([...images, { src: reader.result, name: file.name, image: file }]);
            };
            reader.readAsDataURL(e.target.files[0], 'img');
        }
    }

    const deleteImg = (img) => {
        let findElement = images.filter((ele) => ele === img);
        if(findElement.length){
            setImages(images.filter((ele) => ele !== img));
        }
    }

    const setPreferencesArray = (item) => {
        if(!item?.flag){
            setAvailablePreferences([ ...availablePreferences, item?.val ]);
        } else{
            setAvailablePreferences(availablePreferences.filter((pre) => pre !== item?.val));
        }
    }

    const arr = getAboutClientData(subCategories, categories, preferences);

    return(

        <div className="app-flex-row align-items-center justify-content-between h-100 position-relative">
            
            <FaTimes className="close-icon mr-2 mt-2" onClick={closeService} />

            <div className="bg-lightSecondary px-0 pt-3 h-100 rounded-lg" style={{ width: '49%' }}>

                <div className="account-edit-form change-password app-flex-column position-relative py-3 px-5">

                    <WrapperFields width="100%">
                        <span className="fields-labels">Service category</span>                    
                        
                        <CustomDropdown prefrences={true} arr={arr} chooseOption={(item) => setCategory(item?.value)}
                         className="mr-2" 
                         title={ availablePreferences?.length ? comaSeparateNames(availablePreferences) : 'Choose' } 
                         getCheckBoxValue={(item) => setPreferencesArray(item)}
                        />

                    </WrapperFields>

                    <WrapperFields width="100%">
                        <span className="fields-labels">Promotion Title</span>                    
                        <Input placeholder="Promotion Title" value={title} type="text"
                            onChange={(e) =>setTitle(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                        />
                    </WrapperFields>

                    <WrapperFields width="100%">
                        <span className="fields-labels">About The Promotion</span>                    
                        <textarea placeholder="About The Promotion" value={about} type="text"
                            onChange={(e) =>setAbout(e.target.value)} className="custom-input-field 
                            fields-backgruond mr-2 textarea-size"
                        />
                    </WrapperFields>

                    <WrapperFields width="100%">
                        <span className="fields-labels">Promotion Guidelines</span>                    
                        <textarea placeholder="Promotion Guidelines" value={guidelines} type="text"
                            onChange={(e) => setGuidelines(e.target.value)} className="custom-input-field 
                            fields-backgruond mr-2 textarea-size"
                        />
                    </WrapperFields>
                    
                </div>

            </div>

            <div className="bg-lightSecondary px-0 pt-3 h-100 rounded-lg" style={{ width: '49%' }}>

            <div className="account-edit-form change-password app-flex-column position-relative py-3 px-5">

                <WrapperFields width="100%">
                    <span className="fields-labels">Promo Duration (Day's)</span>                    
                    <Input placeholder="Promo Duration (Day's)" value={duration} type="number"
                        onChange={(e) => setDuration(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                    />
                </WrapperFields>                

                <WrapperFields width="100%">
                    <span className="fields-labels">People Per Package</span>                    
                    <Input placeholder="People Per Package" value={poeplePerPackage} type="number"
                        onChange={(e) => setPoeplePerPackage(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                    />
                </WrapperFields>

                <WrapperFields width="100%">
                    <span className="fields-labels">Package Price</span>                    
                    <Input placeholder="Package Price" value={packagePrice} type="number"
                        onChange={(e) => setPackagePrice(e.target.value)} className="custom-input-field fields-backgruond mr-2"
                    />
                </WrapperFields>

                <WrapperFields width="100%">
                    <span className="fields-labels">Promotion Validity</span>                    
                    <div className="mr-2 app-flex-row align-items-center justify-content-between" style={{ width: '62%' }}>
                        <Input placeholder="Date" value={startDate} type="date"
                            onChange={(e) => setStartDate(e.target.value)} className="custom-input-field fields-backgruond width-flex-adjustment"
                        />
                        <Input placeholder="Date" value={endDate} type="date"
                            onChange={(e) => setEndDate(e.target.value)} className="custom-input-field fields-backgruond width-flex-adjustment"
                        />
                    </div>
                </WrapperFields>

                <WrapperFields width="100%">
                    <span className="fields-labels">Upload Image</span>                    

                    <div className="app-flex-row align-items-center px-0 m-0"
                     style={{ width: images?.length > 4 ? '64%' : '100%' }}>
                        <label className="edit-service-uploadimage mr-2">
                            <FaPlus className="edit-service-uploadimage-icon" />
                            <Input type="file" onChange={(e) => addImg(e)} />
                        </label>

                        { images?.length ?
                            <div className="app-flex-row w-75 position-relative" style={{ overflowX: 'auto' }}>
                             { images?.map((image, i) => (
                                 <div className="relative promo-images" key={i}>
                                    <img src={image?.src} className="edit-service-uploadimage mr-2 py-0 mb-2" />
                                    <FaTimes className="delete-img" onClick={() => deleteImg(image)} />
                                 </div>
                             )) }   
                            </div> : null
                        }

                    </div>

                </WrapperFields>
                <WrapperFields width="100%">
                    <span className="fields-labels">Terms and Conditions</span>                    

                    <textarea placeholder="Terms and Conditions" value={termsConditions} type="text"
                        onChange={(e) => setTermsConditions(e.target.value)} className="custom-input-field 
                        fields-backgruond mr-2 textarea-size"
                    />
                </WrapperFields>

                </div>

            </div>

        </div>

    );

}
 
export default EditService;