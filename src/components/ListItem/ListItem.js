import { React, useState, useEffect } from 'react';
import './ListItem.css';
import { Avatar } from './../Avatar/Avatar';
import { Button } from 'react-bootstrap';

import { GetButtons } from '../getButtons/getButtons';

import { Loading } from '../Loading/Loading';
import { convertDate } from '../../utilities/CommonMethods';

const ListItem = (props) => {

    const { button, buttonText, onClick, user, banedUnbanedUser, report, reportData } = props;    

    const { businessAccButtons, clickView, deActivateAccount } = props; // for businessAccount buttons

    const [buttonLoading, setButtonLoading] = useState(false);
    const [deActivateLoading, setDeActivateLoading] = useState(false);

    useEffect(() => {
        
        return () => {
            setDeActivateLoading(false);
            setButtonLoading(false);
        };

    }, []);

    const banUnbanUser = (e, currentUser) => {
        e.stopPropagation();
        setButtonLoading(true);
        banedUnbanedUser(currentUser);
    }

    return(

        <div className="list-item app-flex-row" onClick={() => onClick(user)}>

            <div className="avatar-bg-change">
                {
                    businessAccButtons ? <Avatar name="name" src={user?.logo} /> :
                    reportData ? <Avatar name="name" src={user?.reportedBy?.profileImage} /> :
                    <Avatar name="name" src={user?.profileImage} /> 
                }
            </div>

            <div className="app-flex-column ml-3 w-100 justify-content-center">
                <div className="app-flex-row align-items-center justify-content-between w-100">
                    
                    { (user && !reportData) && 
                        <h6>
                            { user?.fullName ? user?.fullName : user?.reportedTo ? user?.reportedTo?.name : user?.name}
                        </h6> 
                    }

                    { reportData && 
                        <span className="w-100">
                            <b>{user?.reportedBy?.name}</b> reported the user profile of <b>{user?.reportedTo?.name}</b>
                        </span> 
                    }
                    

                    {
                        button ? 
                            <Button className="lift-ban" onClick={(e) => banUnbanUser(e, user)}>
                                { buttonLoading ? <Loading variant="white" size="sm" /> : buttonText }
                            </Button>
                        : reportData ?
                          <span>{ convertDate(user?.createdAt) }</span> : null
                    }

                    {
                        businessAccButtons &&
                        <GetButtons title1="view" 
                         title2={ deActivateLoading ? <Loading variant="white" size="sm" /> : 'deactivate' } 
                         className="business-detail-buttons" 
                         click1={(e) => {
                            e.stopPropagation();
                            clickView(user);
                         }} 
                         click2={(e) => {
                            e.stopPropagation();
                            setDeActivateLoading(true);
                            deActivateAccount(user);
                         }}  
                        />
                    }

                </div>
                <hr className="bg-white" />
            </div>

        </div>

    );

}

export default ListItem;