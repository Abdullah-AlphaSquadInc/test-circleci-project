import React, { useContext, useState, useEffect } from 'react';
import './TopBar.css';
import MyContext from '../../context/AuthContext/context';
import { Button } from 'react-bootstrap';
import {GetButtons} from '../getButtons/getButtons';
import { FaSearch } from 'react-icons/fa';
import {Input} from '../Input/Input';
import { Loading } from '../Loading/Loading';

export const TopBar = (props) => {

    const value = useContext(MyContext);

    const [ getButton1Loading, setGetButton1Loading ] = useState(false);
    const [ getButton2Loading, setGetButton2Loading ] = useState(false);

    const { icon, heading } = props;

    const { showButtons, title1, title2, buttonsClassName, singleButton, singleButtonClick, singleButtonLoading } = props; // button props;

    const { showSearch, searchValue, changeSearch, pressEnter } = props; // search props;

    const { getButton1Click, getButton2Click } = props;

    useEffect(() => {
        setGetButton1Loading(false);        
        setGetButton2Loading(false);        
    }, [showButtons]);

    const getButtonsClicks = (e, flag) => {
        e.stopPropagation();
        if(flag === 1){
            setGetButton1Loading(true);
            getButton1Click();
        } else{
            setGetButton2Loading(true);
            getButton2Click();
        }

        setTimeout(() => {
            setGetButton1Loading(false);        
            setGetButton2Loading(false);   
        }, 1000);
    }

    return(
        <div className="top-bar">   
            
            <div className="app-flex-row align-items-center">
                <span>{icon}</span>
                <h6 className="pt-1">{heading}</h6>

                {
                    singleButton &&
                    <div className={`ml-auto`}>
                        <Button className={`bg-skyblue text-black text-uppercase px-4
                        ${ (showSearch && singleButton) ? 'py-2 rounded-lg mr-2' : '' }`} 
                        onClick={singleButtonClick}>
                        
                            { singleButtonLoading ? <Loading size="sm" /> : title1}
                        
                        </Button>

                    </div>
                }

                {
                    showButtons &&
                    <div className="ml-auto">
                        <GetButtons 
                            title1={ getButton1Loading ? <Loading size="sm" /> : title1 } 
                            title2={ getButton2Loading ? <Loading size="sm" /> : title2 } 
                            className={buttonsClassName} 
                            click1={(e) => getButtonsClicks(e, 1)} 
                            click2={(e) => getButtonsClicks(e, 2)}  
                        />  
                    </div>
                }

                {
                    showSearch &&
                    <div className={`position-relative ${ (showSearch && singleButton) ? '' : 'ml-auto' } `} 
                    style={{ width: '320px' }}>
                        
                        <Input placeholder="Search" type="search" className="custom-input-field fields-backgruond" 
                         style={{ paddingLeft: '36px' }} value={searchValue} onChange={(e) => changeSearch(e.target.value)} 
                         pressEnter={(e) => pressEnter(e)}
                        />

                        <FaSearch className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />

                    </div>
                }

            </div>

        </div>
    );
}