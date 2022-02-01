import React, { useState } from 'react';
import { Routes } from '../../Routes/Routes';
import MyContext from './context';

const AuthProvider = (props) => {

    const [ loginAuth, setLoginAuth ] = useState(false);

    const [ currRole, setCurrRole ] = useState(false);

    const [ user, setUser ] = useState(undefined);

    const [ startRoute, setStartRoute ] = useState(undefined);

    const updateValues = (val) => {
        const { currentUser, auth, role } = val;
        const route = role ? Routes.reports : Routes.profile;
        setStartRoute(route);
        setLoginAuth(auth);
        setCurrRole(role);
        setUser(currentUser);
    }

    return(
        <MyContext.Provider 
            value={{ 
                data: { loginAuth, currRole, route: startRoute, currentUser: user }, 
                isLoggedIn: (val) => updateValues(val) 
            }}
        >
            
            {props.children}

        </MyContext.Provider>
    )

}


export default AuthProvider;