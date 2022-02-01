import React, { useContext } from "react";
import './Sidebar.css';

import { sidebarContent } from "../../Assets/Data";
import { Avatar } from './../Avatar/Avatar';
import { Images } from '../../Assets/Images';
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { RiLogoutCircleRLine } from "react-icons/ri";

import MyContext from '../../context/AuthContext/context';

const Sidebar = (props) => {

    const value = useContext(MyContext);

    const { data: { currRole, currentUser }, isLoggedIn } = value;

    const isLogout = () => {
        localStorage.clear();
        isLoggedIn({ role: false, auth: false, currentUser: undefined });
    }

    return(

        <div className="sidebar">
            
            <div className="app-flex-row align-items-center mb-5 sidebar-padding">
                <Avatar name="name" src={ Images.avatar } />
                <div className="app-flex-column text-white ml-3">
                    <h6>Welcome,</h6>
                    <h6>{ currentUser?.name }</h6>
                </div>
            </div>

            <div className="app-flex-column">
                {
                    sidebarContent(currRole).map((sidebar, index) => (
                        <SidebarItem key={index} nav={sidebar} />
                    ))
                }
            </div>
            
            <div className="logout-btn app-flex-row align-items-center mt-auto text-white cursor-pointer-sort sidebar-padding"
            onClick={isLogout}>

                <RiLogoutCircleRLine className="mr-2" />
                <h6>Log Out</h6>

            </div>

        </div>

    );

}

export default Sidebar;