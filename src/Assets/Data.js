import { Routes } from "../Routes/Routes";

import { FaUsers, FaUserLock,FaLock, BiMessageDetail, FaRegUserCircle, AiFillSetting, FaUserFriends, VscSettings,
    MdReport, MdAccountBalance, IoIosPricetags, IoDuplicate } from 'react-icons/all';

// Roles
export const Role = {
    superAdmin: { name: 'superAdmin', flag: true },
    admin: { name: 'admin', flag: false }
}

export const sidebarContent = (role) => {

    return [
        { id: Math.random(), item: 'Profile', route: Routes.profile, icon: <FaRegUserCircle className="side-icons mr-2" /> },
        { id: Math.random(), item: 'Services', route: Routes.services, icon: <VscSettings className={`side-icons mr-2`} /> },
        { id: Math.random(), item: 'Messages', route: Routes.messages, icon: <BiMessageDetail className={`side-icons mr-2`} /> },
        { id: Math.random(), item: 'Clients', route: Routes.clients, icon: <FaUserFriends className="side-icons mr-2" /> }
        // { id: Math.random(), item: 'Settings', route: Routes.settings, icon: <AiFillSetting className={`side-icons mr-2`} /> }
    ];
}

export const checkBoxesData = [
    { index: 0, labelText: 'Prking' },
    { index: 1, labelText: 'Indoor Dining' },
    { index: 2, labelText: 'Outdoor Dining' },
    { index: 3, labelText: 'Wifi' },
    { index: 4, labelText: 'Airconditioning' },
    { index: 5, labelText: 'Complementary breakfast' },
    { index: 6, labelText: 'Credit Card payment' },
    { index: 7, labelText: 'Food Delivery' },

    { index: 0, labelText: 'Flexible check-in/check-out' },
    { index: 1, labelText: 'In-room Amenties' },
    { index: 2, labelText: 'Free Breakfast' },
    { index: 3, labelText: 'Free Parking' },
    { index: 4, labelText: 'Bar Lounge' },
    { index: 5, labelText: 'Fitness Center' },
    { index: 6, labelText: 'Coffee Machine' },
    { index: 7, labelText: 'Keyless Entry' },

    { index: 0, labelText: 'Baseball' },
    { index: 1, labelText: 'Basketball' },
    { index: 2, labelText: 'Badmintor' },
    { index: 3, labelText: 'Golf' },
    { index: 4, labelText: 'Soccer' },

    { index: 0, labelText: 'Museums' },
    { index: 1, labelText: 'Theatre play' },
    { index: 2, labelText: 'Zoo' },
    { index: 3, labelText: 'Parks and Wildlife' },
    { index: 4, labelText: 'Adventure Parks' },
];

export const clientTableHeading = ["", "CLIENT NAME", "DATE AVAILMENT", "DETAILS"];

export const servicesTableHeading = ["TITLE", "DESCRIPTION", "PREFERENCES", "VALIDITY", "DETAILS"];

export const categoryTableHeading = ["Category", "Sub Category", "Type", "Name"];

export const plansTypes = [
    { id: 1, value: "Weekly" },
    { id: 2, value: "Monthly" },
    { id: 3, value: "Quarterly" },
    { id: 4, value: "Bi-Annually" },
    { id: 5, value: "Yearly" }
];


export const promoDurations = [
    { id: 1, value: 2 },
    { id: 2, value: 4 },
    { id: 3, value: 6 },
    { id: 3, value: 8 }
];

export const peoplePackages = [
    { id: 1, value: 2 },
    { id: 2, value: 4 },
    { id: 3, value: 6 },
    { id: 3, value: 8 }
];
