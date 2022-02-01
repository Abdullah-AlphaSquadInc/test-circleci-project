import React, { Fragment } from 'react';
import './Settings.css';

import { AiFillSetting } from 'react-icons/ai';
import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';


const Settings = () => {

    return(

        <Fragment>
            
            <TopBar icon={<AiFillSetting className="side-icons mr-2" />} heading="settings" />

            <ChildrenContainer>

                <h5 className="text-white">Setting Upcoming</h5>

            </ChildrenContainer>

        </Fragment>

    );

}

export default Settings;