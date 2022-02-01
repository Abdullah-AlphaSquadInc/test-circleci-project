import React, { useState, useRef, useEffect, Fragment } from 'react';

import { Button } from 'react-bootstrap';
import { Input } from '../../../../components/Input/Input';
import { Loading } from '../../../../components/Loading/Loading';
import CustomDropdown from '../../../../components/Dropdown/Dropdown';

import { plansTypes } from '../../../../Assets/Data';

import firebase from '../../../../helpers/firebaseHelpers';

const AddEditPlan = (props) => {

    const { edit, currentPlan, handleClose } = props;

    const nameRef = useRef(null);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(() => {
        if(nameRef.current){
            nameRef.current.focus();
        }

        if(currentPlan !== undefined){
            setValues(currentPlan?.name, currentPlan?.price, currentPlan?.paymentCycle);
        } else{
            setValues('', '');
        }

    }, [currentPlan]);
    
    const setValues = (n, p, t) => {
        setName(n);
        setPrice(p);
        setType(t);
    }

    const addNewItem = () => {
        if(!price){
            alert('plz add price');
        } else if(!type){
            alert('plz choose type');
        } else if(!name){
            alert('plz add name');
        } else if(isNaN(price)){
            alert('price should be a number');
        }
        else {
            setLoading(true);
            addEditNewPlan();
        }
    }

    const addEditNewPlan = () => {
        let docName = currentPlan?.id;

        const data = { name, price, paymentCycle: type };

        if(edit){
            firebase.updateRecordsWithCollection("PricingPlans", docName, data, (res) => {
                setLoading(false);
                handleClose();
            });
        } else{
            firebase.setRecordsWithCollection("PricingPlans", "", data, (res) => {
                setLoading(false);
                handleClose();
            });
        }
    }

    return(

        <Fragment>

            <Input placeholder="Enter plan name" value={name} 
                onChange={(e) => setName(e.target.value)} inputref={nameRef}
                className="custom-input-field fields-backgruond" />

            <CustomDropdown 
                className="mt-2 mb-2" arr={plansTypes} 
                title={type}
                chooseOption={(item) => setType(item?.value)} 
            />

            <Input placeholder="Enter price value" value={price} 
                onChange={(e) => setPrice(e.target.value)}
                className="custom-input-field fields-backgruond" />

            <div className="mt-3 justify-content-center app-flex-row">
                <Button className="text-black bg-skyblue border-0" 
                    onClick={addNewItem}>
                        { loading ? <Loading size="sm" variant="black" /> : edit ? 'Update' : 'Add New' }
                </Button>
            </div>
            
        </Fragment>

    );

}
 
export default AddEditPlan;