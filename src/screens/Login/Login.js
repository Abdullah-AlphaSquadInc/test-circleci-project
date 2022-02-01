import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
import "./Login.css";

import { NavLink, Redirect } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { Images } from "../../Assets/Images";

import './Login.css';
import { Routes } from "../../Routes/Routes";
import { Input } from "../../components/Input/Input";

import MyContext from '../../context/AuthContext/context';
import firebase from '../../helpers/firebaseHelpers';

export const Login = (props) => {

    const { loginAuth } = props;

    const value = useContext(MyContext);

    const { isLoggedIn, data: { route } } = value;

    const emailRef = useRef(null);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [spinnerState, setSpinnerState] = useState(false);

    useEffect(() => {
        if(emailRef.current){
            emailRef.current.focus();
        }
    }, []);

    const isLogin = () => {
        setSpinnerState(true);

        if(!email){
            errorFind('Please type email.');
        }
        else if(!password){
            errorFind('Please type password.');
        }
        else{
            setSpinnerState(true);
            findUser();
        }

    }

    const findUser = () => {
        firebase.signIn(email, password, (res) => {

            if(res?.success){

                firebase.getRecordsWithCollection("BusinessAccounts", (accounts) => {
                    const { data, success } = accounts;

                    if(success){
                        const exits = data.filter((acc) => acc?.accountId === res?.data?.uid);
                        console.log("exits ===>", exits);
                        if(exits?.length && exits[0].isApproved){
                            localStorage.setItem("isLogin", true);
                            localStorage.setItem("businessAccountId", res?.data?.uid);
                            isLoggedIn({ role: false, auth: true, currentUser: { name: 'Estab Admin' } });
                        }
                        else{
                            errorFind('Sign In failed.');
                        }
                    }
                    else{
                        errorFind('user not found.');
                    }
                });

            }
            else{
                errorFind('Sign In failed.');
            }
        });
    }

    const errorFind = (msg) => {
        setSpinnerState(false);
        showAlert(msg);
    }

    const showAlert = (msg) => {
        alert(msg);
    }

    if(loginAuth)
        return <Redirect exact to={route} />;

    else
        return(

            <div className="login-page">

                <div style={{ width: '400px' }} className="text-center">

                    <img alt="" src={Images.logo} width="160px" />

                    <h5 className="login-white-heading">Login</h5>

                    <Input placeholder="Your Email" value={email} type="email" inputref={emailRef}
                    onChange={(e) => setEmail(e.target.value)} className="mb-2 mt-4 custom-input-field" />

                    <Input placeholder="Your Password" value={password} type="password"
                     onChange={(e) => setPassword(e.target.value)} className="mb-4 custom-input-field"
                     pressEnter={() => isLogin()}
                    />

                    <Form.Group controlId="formBasicCheckbox" className="login-white-heading m-0">
                        <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>

                    <Button className="login-input-style login-button" onClick={isLogin}>
                        {
                            spinnerState ?
                            <Spinner animation="border" role="status" size="sm">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            : 'Login'
                        }
                    </Button>

                    <NavLink to={`/`} className="forgot-password">
                        ForgotPassowrd
                    </NavLink>

                </div>

            </div>

        );

}
