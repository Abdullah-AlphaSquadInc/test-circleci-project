import React from 'react';
import './Accordian.css';

import { Card, Button, Accordion} from 'react-bootstrap';
import { RiArrowDownSLine } from 'react-icons/ri';
import BlackBanner from '../BlackBanner/BlackBanner';
import { EditDeleteIcons } from '../EditDeleteIcons/EditDeleteIcons';

const CustomAccordian = (props) => {
    
    const { icon, heading, text, background, transparent } = props;

    const {  addNew, addNewClick, showEditDelete, editClick, deleteClick, showValidity } = props;

    return (

        <Accordion className="bg-transparent p-0 m-0 shadow-none">
            <Card className="p-0 m-0 bg-transparent border-0 shadow-none">
                
                <Card.Header className="p-0 m-0 border-0 shadow-none">
                
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="p-0 m-0 w-100">
                        
                        <BlackBanner transparent={transparent}>
                            {icon}
                            
                            <span className="ml-2 mr-2 w-100 text-left font-weight-bold">{ heading }</span>
                            
                            { addNew && <EditDeleteIcons showOnlyAdd clickEdit={(e) => {
                                e.stopPropagation();
                                addNewClick();
                            }} /> }

                            {
                                showEditDelete ? 
                                    <div className="ml-auto">
                                        <EditDeleteIcons shoeEyeWithAddDelete 
                                            clickEdit={() => editClick()} clickDelete={() => deleteClick()}
                                        />
                                    </div> 
                                :
                                showValidity ?
                                    <div className="app-flex-row align-items-center justify-content-end">
                                        <span> <span className="font-weight-bold">Validity:</span> { showValidity } </span>
                                        <RiArrowDownSLine className="text-skyblue" style={{ fontSize: '22px' }} />
                                    </div>
                                :
                                <RiArrowDownSLine className="text-skyblue ml-auto" style={{ fontSize: '22px' }} />
                            }

                        </BlackBanner>

                    </Accordion.Toggle>
                
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                
                    <Card.Body className={`my-2 overflow-auto ${ background ? 'bg-secondary' : '' } `} 
                        style={{ borderRadius: '8px', height: transparent ? 'auto' : '150px' }}>
                        { text }
                    </Card.Body>
                
                </Accordion.Collapse>

            </Card>
        </Accordion>

    );

}
 
export default CustomAccordian;