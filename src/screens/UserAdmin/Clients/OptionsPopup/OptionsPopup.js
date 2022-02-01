import React, { useState, useRef, Fragment } from 'react';

import { Button } from 'react-bootstrap';
import { Input } from '../../../../components/Input/Input';
import { Loading } from '../../../../components/Loading/Loading';
import firebase from '../../../../helpers/firebaseHelpers';

const OptionsPopupCreateThread = (props) => {

    const newValueRef = useRef(null);

    const { user, sender, handleClose } = props;

    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const addNewItem = () => {
        if(!inputValue){
            alert('Please write value.');
        } else{
            setLoading(true);
            const data = { 
                message: inputValue, participants: [user?.id, sender?.accountId],
                user1: { id: user?.id, image: user?.profileImage, name: user?.fullName },
                user2: { id: sender?.accountId, image: sender?.logo, name: sender?.name }
            };
            addNewThread(data);
        }
    }

    const addNewThread = (data) => {
        console.log(data);

        firebase.setRecordsWithCollection("ChatThreads", "", data, (res) => {
            closePopup();
        });
    }

    const closePopup = () => {
        setLoading(false);
        handleClose();
    }

    return(

        <Fragment>
            
            <Input placeholder="Enter Message" value={inputValue} 
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

export default OptionsPopupCreateThread;