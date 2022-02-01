import React, { useState, useRef, Fragment } from 'react';
import './ChangePassword.css';

import { Input } from '../../../components/Input/Input';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { WrapperFields } from '../../../components/WrapperFields/WrapperFields';

import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';
import { FaLock } from 'react-icons/fa';

import firebase from '../../../helpers/firebaseHelpers';

const WrapperFieldIcons = ({ children }) => {
    return <div className="position-relative w-100">
        {children}
    </div>;
}

const ChangePassword = () => {

    const oldPasswordRef = useRef(null);

    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmNewPassword,setConfirmNewPassword] = useState('');

    const [showCurrentPassword,setShowCurrentPassword] = useState(false);
    const [showNewPassword,setShowNewPassword] = useState(false);
    const [showConfirmNewPassword,setShowConfirmNewPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const onChangeText = (flag, e) => {
        setMsg('');
        const { value } = e.target;

        if(flag === 1){
            setCurrentPassword(value);
        } else if(flag === 2){
            setNewPassword(value);
        } else{
            setConfirmNewPassword(value);
        }
    }

    const isSavePassword = () => {

        if(!currentPassword){
            setMsg('PLease type current password.');
        }
        else if(!newPassword || !confirmNewPassword){
            setMsg('PLease type new password.');
        }
        else if(newPassword !== confirmNewPassword){
            setMsg('Entered password does not match.');
        }
        else{
            setLoading(true);
            firebase.changePassword(currentPassword, confirmNewPassword, (res) => {
                if(res){ setMsgContent('Password successfully changed.'); }
                else{ setMsgContent('Password does not changed.'); }
            });
        }
    }

    const setMsgContent = (text) => {
        setLoading(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setMsg(text);
        setTimeout(() => {
          setMsg('');  
        }, 2000);
    }

    return(

        <Fragment>
            
            <TopBar icon={<FaLock className="side-icons mr-2" />} heading="change password" 
                singleButton title1="Save" singleButtonClick={() => isSavePassword()}
                singleButtonLoading={loading}
            />

            <ChildrenContainer>

                <div className="app-flex-column bg-lightSecondary w-100 pt-3 px-3 rounded-lg">

                    <div className="change-password">
                        
                        {msg ? <span className="mb-4 text-white text-greyDark">{msg}</span> : null}

                        <WrapperFields width="540px">

                            <span className="fields-labels">Current Password</span>                    

                            <WrapperFieldIcons>
                                
                                <Input placeholder="Current Password" value={currentPassword} inputref={oldPasswordRef} 
                                onChange={(e) => onChangeText(1, e)} 
                                className="custom-input-field fields-backgruond"
                                type={!showCurrentPassword ? "password" : "text"} />

                                {
                                    showCurrentPassword ? 
                                    <AiOutlineEyeInvisible className="eye-icons" onClick={() => setShowCurrentPassword(!showCurrentPassword)} />
                                    : <AiOutlineEye className="eye-icons" onClick={() => setShowCurrentPassword(!showCurrentPassword)} />
                                }
                            </WrapperFieldIcons>

                        </WrapperFields>

                        <WrapperFields width="540px">

                            <span className="fields-labels">New Password</span>

                            <WrapperFieldIcons>
                                
                                <Input placeholder="New Password" value={newPassword} type={!showNewPassword ? "password" : "text"}
                                onChange={(e) => onChangeText(2, e)} className="custom-input-field fields-backgruond" />

                                {
                                    showNewPassword ? 
                                    <AiOutlineEyeInvisible className="eye-icons" onClick={() => setShowNewPassword(!showNewPassword)} />
                                    : <AiOutlineEye className="eye-icons" onClick={() => setShowNewPassword(!showNewPassword)} />
                                }

                            </WrapperFieldIcons>

                        </WrapperFields>

                        <WrapperFields width="540px">

                            <span className="fields-labels">Confirm New Password</span>

                            <WrapperFieldIcons>

                                <Input placeholder="Confirm New Password" value={confirmNewPassword} 
                                 type={!showConfirmNewPassword ? "password" : "text"}
                                 onChange={(e) => onChangeText(3, e)} 
                                 className="custom-input-field fields-backgruond" />

                                {
                                    showConfirmNewPassword ? 
                                    <AiOutlineEyeInvisible className="eye-icons" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} />
                                    : <AiOutlineEye className="eye-icons" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} />
                                }

                            </WrapperFieldIcons>

                        </WrapperFields>

                    </div>

                </div>
            
            </ChildrenContainer>

        </Fragment>

    );

}

export default ChangePassword;