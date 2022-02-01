import React from 'react';


import { Card, Button, Accordion} from 'react-bootstrap';
import { RiArrowDownSLine } from 'react-icons/ri';
import { EditDeleteIcons } from '../EditDeleteIcons/EditDeleteIcons';

const PromotionList = (props) => {
    
    const { length } = props;

    const { heading, text } = props;

    const {  addNew, addNewClick, showEditDelete, editClick, deleteClick } = props;

    return(

        <div className={`two-column-layout-right text-white overflow-auto h-100 p-2 ${ length ? 'mb-3' : '' } `}>
            
            <div className="app-flex-row align-items-center w-100 py-2">
                <h6 className="ml-2 mr-2">{ heading }</h6>
                                
                { addNew && <EditDeleteIcons showOnlyAdd clickEdit={(e) => {
                    e.stopPropagation();
                    addNewClick();
                }} /> }

                {
                    showEditDelete &&
                    <div className="ml-auto">
                        <EditDeleteIcons shoeEyeWithAddDelete 
                            clickEdit={() => editClick()} clickDelete={() => deleteClick()}
                        />
                    </div> 
                }
            </div>

            <div className="app-flex-column w-100 py-1 px-0 mx-0">
                { text }
            </div>

        </div>

    );

}
 
export default PromotionList;