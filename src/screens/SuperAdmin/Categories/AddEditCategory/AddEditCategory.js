import React, { useState, useRef, useEffect } from 'react';
import './AddEditCategory.css';

import { WrapperFields } from '../../../../components/WrapperFields/WrapperFields';
import { EditDeleteIcons } from '../../../../components/EditDeleteIcons/EditDeleteIcons';
import { Input } from '../../../../components/Input/Input';
import CustomDropdown from '../../../../components/Dropdown/Dropdown';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import OptionsPopup from '../OptionsPopup/OptionsPopup';
import { comaSeparateNames } from '../../../../utilities/CommonMethods';

import firebase from '../../../../helpers/firebaseHelpers';


const AddEditCategory = (props) => {
    
    const { currentCategory, getBackResult, performAddEdit } = props;

    const nameRef = useRef(null);

    const [name,setName] = useState('');
    const [type,setType] = useState('');
    const [category,setCategory] = useState({ cat: '', catId: '' });
    const [subCategory,setSubCategory] = useState({ subCat: '', catId: '', subCatId: '' });

    const [allTypes,setAllTypes] = useState([]);
    const [allCategories,setAllCategories] = useState([]);
    const [allSubCategories,setAllSubCategories] = useState([]);

    const [showModal,setShowModal] = useState(false);
    const [showModalTitle,setShowModalTitle] = useState('');

    useEffect(() => {

        initialRender();

        return () => {
            setValues('', '', { cat: '', catId: '' }, { subCat: '', catId: '', subCatId: '' });
        };

    }, []);

    useEffect(() => {
        
        makeFinalObject();

    }, [type, category, name, subCategory, performAddEdit]);

    const initialRender = () => {
        const { current } = nameRef;
        
        if(current){
            current.focus();
        }

        getInitialData();

        if(currentCategory !== undefined){

            setValues(currentCategory?.name, currentCategory?.type, 
                    { cat: currentCategory?.category, catId: '' }, 
                    { subCat: currentCategory?.subCategory, catId: '', subCatId: '' } 
                );

        } else{
            setValues('', '', { cat: '', catId: '' }, { subCat: '', catId: '', subCatId: '' });
        }

    }

    const setValues = (n, t, cat, subCat) => {
        setName(n); setType(t);
        setCategory(cat); setSubCategory(subCat);
    }

    const getInitialData = () => {
        getMyTypes();
        getMyCategories();
        getMySubCategories(false, "");
    }

    const getMyTypes = () => {
        firebase.getRecordsWithCollection("Types", (res) => {
            setAllTypes(res?.data?.map((t, i) => { return { value: t?.name, ...t } }));
        });
    }

    const getMyCategories = () => {
        firebase.getRecordsWithCollection("Categories", (res) => {
            setAllCategories(res?.data?.map((t, i) => { return { value: t?.name, ...t } }));
        });
    }

    const getMySubCategories = (filter, id) => {
        firebase.getRecordsWithCollection("SubCategories", (res) => {
            if(filter){
                setAllSubCategories(res?.data?.filter((cat) => cat?.categoryId === id)
                    ?.map((t, i) => { return { value: t?.name, ...t } }));
            }else{
                setAllSubCategories(res?.data?.map((t, i) => { return { value: t?.name, ...t } }));
            }
        });
    }

    const chooseType = (item) => {
        setType(item?.value);
    }

    const chooseCategory = (item) => {
        const { value, id } = item;
        setCategory({ cat: value, catId: id });
        setSubCategory({ subCat: '', catId: id });
        getMySubCategories(true, id);
    }

    const chooseSubCategories = (item) => {
        setSubCategory({ ...subCategory, subCat: item?.value, subCatId: item?.id })
    }

    const openModal = (title) => {
        setShowModalTitle(title);
        setShowModal(true);
    }

    const resets = (flag) => {
        if(flag === "Type"){
            getMyTypes();
        } else if(flag === "Category"){
            getMyCategories();
            setSubCategory({ subCat: '', catId: '' });
        } else if(flag === "SubCategory"){
            getMySubCategories(true, category?.catId);
        }
    }

    const makeFinalObject = () => {
        if(performAddEdit){

            const result = {
                edit: currentCategory !== undefined ? true : false,
                data: { name, category: category.cat, subCategory: subCategory.subCat, type }
            };

            getBackResult(result);
        }
    }

    return(

        <div className="change-password">

            <WrapperFields width="580px">

                <span className="fields-labels">Name</span>                    

                <Input placeholder="Name" value={name} inputref={nameRef} type="text"
                    onChange={(e) => setName(e.target.value)} className="custom-input-field fields-backgruond mr-4"
                />

            </WrapperFields>

            <WrapperFields width="580px">

                <span className="fields-labels">Type</span>                    

                <CustomDropdown 
                    className="mr-2 dropdown-item-button-category" title={type}
                    arr={allTypes} chooseOption={(item) => chooseType(item)} 
                />

                <EditDeleteIcons showOnlyAdd clickEdit={() => openModal('Type')} />

            </WrapperFields>

            <WrapperFields width="580px">

                <span className="fields-labels">Category</span>                    

                <CustomDropdown className="mr-2" arr={ allCategories } 
                    chooseOption={(item) => chooseCategory(item)} 
                    title={category?.cat ? category?.cat : 'Choose Category'} 
                />

                <EditDeleteIcons showOnlyAdd clickEdit={() => openModal('Category')} />

            </WrapperFields>

            <WrapperFields width="580px">

                <span className="fields-labels">Sub Category</span>                    

                <CustomDropdown className="mr-2" arr={ category?.cat ? allSubCategories : []} 
                    title={ subCategory?.subCat ? subCategory?.subCat : 'Choose Sub Category' }
                    chooseOption={(item) => chooseSubCategories(item)} 
                />

                <EditDeleteIcons showOnlyAdd clickEdit={() => openModal('SubCategory')} />

            </WrapperFields>

            <CustomModal 
                show={showModal} handleClose={() => setShowModal(false)} 
                title={`Add New ${showModalTitle}`}
            >
                <OptionsPopup 
                    handleClose={() => setShowModal(false)}
                    flag={showModalTitle}
                    resetOptions={(flag) => resets(flag)}
                    data={{ catId: subCategory?.catId }}
                />
            </CustomModal>

        </div>

    );

}
 
export default AddEditCategory;