import React, { useState, Fragment, useEffect } from 'react';
import './Pricing.css';

import { Input } from '../../../components/Input/Input';
import { WrapperFields } from '../../../components/WrapperFields/WrapperFields';
import { EditDeleteIcons } from '../../../components/EditDeleteIcons/EditDeleteIcons';

import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';
import { IoIosPricetags } from 'react-icons/all';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { Loading } from '../../../components/Loading/Loading';
import firebase from '../../../helpers/firebaseHelpers';

import GetRecordsRender from '../../../components/GetRecords/GetRecords';

import AddEditPlan from './AddEditPlan/AddEditPlan';

const Pricing = () => {
    
    const [ loadPlans, setLoadPlans ] = useState(false);
    const [ allPlans, setAllPlans ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ currentPlan, setCurrentPlan ] = useState(undefined);

    const [ addEditLoading, setAddEditLoading ] = useState(false);
    const [ performAddEdit, setPerformAddEdit ] = useState(false);

    useEffect(() => {        
        getAllPlans();
    }, []);

    const getAllPlans = () => {
        
        setLoadPlans(true);

        firebase.getRecordsWithCollection("PricingPlans", (res) => {
            
            const { success, data } = res;
            setLoadPlans(false);            
            setCurrentPlan(undefined);

            if(success){
                setAllPlans(data);
            } else{
                setAllPlans([]);
            }

        });
    }

    const deletePlan = (item) => {
        let docName = item?.id;

        firebase.deleteRecordsWithCollection("PricingPlans", docName, (res) => {
            getAllPlans();
        });
    }

    const openAddEditModal = (flag, item) => {
        setCurrentPlan(item);
        setShowModal(flag);
        setPerformAddEdit(false);
    }

    return(

        <Fragment>
            
            <TopBar icon={<IoIosPricetags className="side-icons mr-2" />} heading="pricing" 
                singleButton title1={ currentPlan !== undefined ? 'Edit Plan' : "Add Plans"} 
                singleButtonClick={() => showModal ? setPerformAddEdit(true) : openAddEditModal(true, undefined) } 
                singleButtonLoading={addEditLoading}
            />

            <ChildrenContainer>

                <div className="app-flex-column bg-lightSecondary w-100 pt-1 px-3 rounded-lg">

                    <div className="change-password">

                        <GetRecordsRender loader={loadPlans} arr={allPlans}>
                            {
                                allPlans?.length > 0 && allPlans.map((plan, index) => (
                                    <WrapperFields width="600px" key={index}>

                                        <span className="fields-labels">{plan?.name}</span>                    

                                        <Input placeholder="Basic Membership" value={`${plan?.price} / ${plan?.paymentCycle}`} 
                                            type="text"
                                            className="custom-input-field fields-backgruond mr-2"
                                            readOnly={true}
                                        />

                                        <EditDeleteIcons 
                                            clickEdit={() => openAddEditModal(true, plan)} 
                                            clickDelete={() => deletePlan(plan)} 
                                        />

                                    </WrapperFields>
                                ))
                            }
                        </GetRecordsRender>

                    </div>

                    <CustomModal show={showModal} handleClose={() => openAddEditModal(false, undefined)} 
                        title={`${currentPlan !== undefined ? 'Edit ' : 'Add '} Pricing Plan`} >
                        
                        <AddEditPlan 
                            edit={ currentPlan !== undefined ? true : false } 
                            currentPlan={currentPlan}
                            handleClose={() => {
                                openAddEditModal(false, undefined);
                                getAllPlans();
                            }}
                        />

                    </CustomModal>

                </div>
            
            </ChildrenContainer>
        
        </Fragment>

    );

}

export default Pricing;