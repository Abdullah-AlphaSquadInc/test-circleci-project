import React, { useState, useRef, useEffect, Fragment } from 'react';

import { Button } from 'react-bootstrap';
import { Input } from '../../../../components/Input/Input';
import { Loading } from '../../../../components/Loading/Loading';
import firebase from '../../../../helpers/firebaseHelpers';

const OptionsPopup = (props) => {

    const newValueRef = useRef(null);

    const { flag, handleClose, resetOptions, data } = props;

    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(newValueRef.current){
            newValueRef.current.focus();
        }

        return () => {
            setInputValue('');
            setLoading(false);
        }
    }, [])

    const addNewItem = () => {
        if(!inputValue){
            alert('Please write value.');
        } else{
            setLoading(true);
            
            if(flag === "Type"){
                addNewType();
            } else if(flag === "Category"){
                addNewCategory();
            } else {
                addNewSubCategory();
            }
        }
    }

    const addNewType = () => {
        const data = { name: inputValue };
        firebase.setRecordsWithCollection("Types", "", data, (res) => {
            closePopup();
        });
    }

    const addNewCategory = () => {
        const result = { name: inputValue };
        firebase.setRecordsWithCollection("Categories", "", result, (res) => {
            closePopup();
        });
    }

    const addNewSubCategory = () => {
        const { catId } = data;

        const result = { name: inputValue, categoryId: catId };
        firebase.setRecordsWithCollection("SubCategories", "", result, (res) => {
            closePopup();
        });
    }

    const closePopup = () => {
        handleClose();
        resetOptions(flag);
    }

    return(

        <Fragment>
            
            <Input placeholder="Enter Value" value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} inputref={newValueRef}
                className="custom-input-field fields-backgruond mb-1" 
                pressEnter={(e) => addNewItem()}    
            />

            <div className="mt-3 justify-content-center app-flex-row">
                <Button className="text-black bg-skyblue border-0" 
                    onClick={addNewItem}>
                        { loading ? <Loading size="sm" variant="black" /> : 'Add New' }
                </Button>
            </div>
        </Fragment>

    );

}

export default OptionsPopup;