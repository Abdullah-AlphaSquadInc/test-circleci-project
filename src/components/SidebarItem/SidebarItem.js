import { React } from "react";
import './SidebarItem.css';
import { NavLink } from 'react-router-dom';

import { RiArrowDropRightLine } from 'react-icons/ri';

export const SidebarItem = ({ nav }) => {

    return(

        <NavLink to={`/${nav.route}`} className="nav-item" activeClassName="active-nav-item">

            <div className="app-flex-row align-items-center sidebar-padding">

                <span>{nav.icon}</span>
                <p>{nav.item}</p>
                <RiArrowDropRightLine className="sidebar-arrow-icon" />

            </div>

        </NavLink>

    );
}