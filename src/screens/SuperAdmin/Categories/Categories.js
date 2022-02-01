import React, { useState, Fragment, useEffect } from 'react';
import './Categories.css';

import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';
import { IoDuplicate, FaTimes } from 'react-icons/all';
import CustomTable from '../../../components/CustomTable/CustomTable';
import { categoryTableHeading } from '../../../Assets/Data';

import CategoryItem from './CategoryItem/CategoryItem';
import AddEditCategory from './AddEditCategory/AddEditCategory';
import GetRecordsRender from '../../../components/GetRecords/GetRecords';

import firebase from '../../../helpers/firebaseHelpers';

const Categories = () => {

    const [ loadCat, setLoadCat ] = useState(false);
    const [ loadDeleteCat, setLoadDeleteCat ] = useState(false);
    const [ loadAddEditCat, setLoadAddEditCat ] = useState(false);
    const [ addEditCat, setAddEditCat ] = useState(false);

    const [ allCategories, setAllCategories ] = useState([]);

    const [ currentCategory, setCurrentCategory ] = useState(undefined);
    const [ performAddEdit, setPerformAddEdit ] = useState(false);

    useEffect(() => {
        getAllCategories();
    }, []);

    const showDetail = (flag, item) => {
        setAddEditCat(flag);
        setCurrentCategory(item);
        setPerformAddEdit(false);
    }

    const getAllCategories = () => {
        setLoadCat(true);

        firebase.getRecordsWithCollection("Preferences", (res) => {
            
            const { success, data } = res;
            setLoadCat(false);            
            setAddEditCat(false);
            setCurrentCategory(undefined);

            if(success){
                setAllCategories(data);
            } else{
                setAllCategories([]);
            }

        });
    }

    const deleteCategory = (item) => {
        let docName = item?.id;

        setLoadDeleteCat(true);

        firebase.deleteRecordsWithCollection("Preferences", docName, (res) => {
            setLoadDeleteCat(false);
            getAllCategories();
        });
    }

    const addOrUpdateCategory = (result) => {

        let docName = currentCategory?.id;

        const { data, edit } = result;

        setLoadAddEditCat(true);

        if(edit){
            firebase.updateRecordsWithCollection("Preferences", docName, data, (res) => {
                setLoadAddEditCat(false);
                getAllCategories();
            });
        } else{
            firebase.setRecordsWithCollection("Preferences", "", data, (res) => {
                setLoadAddEditCat(false);
                getAllCategories();
            });
        }

    }

    console.log(performAddEdit)

    return(

        <Fragment>
            
            <TopBar icon={<IoDuplicate className="side-icons mr-2" />} heading="preference categories" 
             singleButton title1={ currentCategory !== undefined ? 'Update Category' : 'Add Category' } 
             singleButtonClick={() => addEditCat ? setPerformAddEdit(true) : showDetail(true, undefined)} 
             singleButtonLoading={loadAddEditCat}
            />

            <ChildrenContainer>

                <div className="app-flex-column bg-lightSecondary w-100 pt-3 px-3 rounded-lg position-relative">   

                    {
                        addEditCat ? 
                            <>
                                <FaTimes className="close-icon mr-2 mt-2" onClick={() => showDetail(false, undefined)} />
                                <AddEditCategory 
                                    performAddEdit={performAddEdit}
                                    closeForm={() => showDetail(false)} currentCategory={currentCategory} 
                                    getBackResult={(result) => addOrUpdateCategory(result)}
                                />
                            </>
                        :
                        <CustomTable headings={categoryTableHeading}>

                            <GetRecordsRender loader={loadCat} arr={allCategories} table={true} colSpan="4">
                                {
                                    allCategories?.length > 0 && allCategories.map((cat, index) => (
                                        <CategoryItem 
                                            key={index} item={cat} 
                                            editCategory={(item) => showDetail(true, item)}
                                            deleteCategory={ (item) => deleteCategory(item) }
                                            delLoading={loadDeleteCat}
                                        />
                                    ))
                                }
                            </GetRecordsRender>

                        </CustomTable>
                    }

                </div>

            </ChildrenContainer>
        
        </Fragment>

    );

}

export default Categories;