import React, { useState, Fragment, useEffect } from 'react';
import './Users.css';

import ListItem from '../../../components/ListItem/ListItem';
import UserDetail from './UserDetail/UserDetail';

import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';
import { FaUsers, FaUserLock } from 'react-icons/fa';

import GetRecordsRender from '../../../components/GetRecords/GetRecords';
import { filterRecordByName } from '../../../utilities/CommonMethods';

import firebase from '../../../helpers/firebaseHelpers';

const AllUsers = (props) => {
    
    const { isBanned } = props;

    const [user, setUser] = useState(undefined);
    const [showDetail, setShowDetail] = useState(false);

    const [ loadUsers, setLoadUsers ] = useState(false);
    const [ allUsers, setAllUsers ] = useState([]);
    const [ allUsersCopy, setAllUsersCopy ] = useState([]);

    const [ searchValue, setSearchValue ] = useState('');

    useEffect(() => {        
        getAllUsers();
    }, []);

    const showUserDetail = (flag, detail) => {
        setShowDetail(flag);
        setUser(detail);
        setLoadUsers(false);
    }

    const getAllUsers = () => {
        
        setLoadUsers(true);

        firebase.getRecordsWithCollection("UserRecords", (res) => {
            
            const { success, data } = res;
            showUserDetail(false, undefined);

            if(success){
                const result = data?.filter((us) => (us?.isBanned === isBanned && us?.isAdmin === false));
                setAllUsers(result);
                setAllUsersCopy(result);
            } else{
                setAllUsers([]);
            }

        });
    }

    const banUnbannedUser = (currentUser) => {
        let docName = currentUser?.id;

        let data = { isBanned: true };

        if(isBanned)
            data = { isBanned: false };

        firebase.updateRecordsWithCollection("UserRecords", docName, data, (res) => {
            getAllUsers();
        });
    }

    const filterUsers = (val) => {
        setAllUsers(filterRecordByName(allUsers, allUsersCopy, val));   
    }

    return(

        <Fragment>
            
            <TopBar icon={isBanned ? <FaUserLock className="side-icons mr-2" /> : <FaUsers className="side-icons mr-2" />} 
                heading={ isBanned ? 'banned users' : 'all users' } pressEnter={() => filterUsers(searchValue)}
                showSearch searchValue={searchValue} 
                changeSearch={(val) => {
                    setSearchValue(val);
                    filterUsers(val);
                }}
            />

            <ChildrenContainer>

                <div className="app-flex-column bg-lightSecondary w-100 pt-3 px-3 rounded-lg">

                    {
                        showDetail ?
                            <UserDetail user={user} closeDetail={() => showUserDetail(false, undefined)} />
                        :
                        <GetRecordsRender loader={loadUsers} arr={allUsers}>
                            {
                                allUsers?.length > 0 && allUsers.map((user, index) => (
                                    <ListItem key={index} user={user} button buttonText={ isBanned ? "LIFT BAN" : "BAN"} 
                                        onClick={(detail) => showUserDetail(true, detail)}
                                        banedUnbanedUser={(currentUser) => banUnbannedUser(currentUser)}
                                    />
                                ))
                            }
                        </GetRecordsRender>
                    }

                </div>
                
            </ChildrenContainer>
        
        </Fragment>

    );

}

export default AllUsers;