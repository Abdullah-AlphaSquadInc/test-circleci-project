import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = (props) => {

    const { show, handleClose, title, children } = props;

    return(

        <Modal show={show} onHide={handleClose} centered>
            
            <Modal.Header closeButton>
                <Modal.Title> { title } </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { children }
            </Modal.Body>

        </Modal>

    );

}

export default CustomModal;