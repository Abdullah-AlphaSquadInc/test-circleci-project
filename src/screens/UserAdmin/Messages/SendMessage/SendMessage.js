import React, { useState } from 'react';
import './SendMessage.css';

import { Loading } from '../../../../components/Loading/Loading';

import { FaPaperPlane, FaCamera } from 'react-icons/fa';
import { Avatar } from '../../../../components/Avatar/Avatar';
import moment from "moment";

const MsgListItem = (props) => {

    const { chat, matchId } = props;

    const autoAssign = chat?.sender?.id === matchId ? true : false ;

    return(
        <div className="px-3 py-2 app-flex-row align-items-center">
            <div className={`text-right mb-4 mr-2 ${ autoAssign ? 'w-100' : '' } `}>
                <Avatar src={chat?.sender?.image} />
            </div>
            <div className="app-flex-column">
                <div className={`p-3 ${ autoAssign ? 'ml-auto bg-skyblue text-black' : 'mr-auto bg-chatList text-white' } `}
                style={{ width: '400px', borderRadius: '12px' }}>
                    { chat?.message }
                </div>
                <span className={`text-greyDark ${ autoAssign ? 'ml-auto' : 'mr-auto' }`}>
                    { new Date(chat?.createdAt).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}) }
                </span>
            </div>
        </div>
    );
}

const SendMessage = (props) => {

    const { allThreadsChats, loadThreadsChats, postMessage, businessAccountID } = props;

    const [ msg, setMsg ] = useState('');

    const sendMessage = () => {
        if(!msg){

        }
        else{
            postMessage(msg);
            setMsg('');
        }
    }

    return (

        <div className="app-flex-column h-100 w-100 send-message">

            <div className="app-flex-column msg-content overflow-auto pt-3" style={{ height: '70vh' }}>

                {
                    loadThreadsChats ? <div className="text-center w-100"><Loading size="sm" variant="white" /></div> :
                    allThreadsChats?.length === 0 ? <div className="text-center w-100">No Chat Found.</div> :
                        allThreadsChats.map((chat, index) => (
                            <MsgListItem key={index} text="Hello" chat={chat} matchId={businessAccountID} />
                        ))
                    // allThreadsChats?.sort((a, b) => moment(a?.createdAt).diff(moment(b?.createdAt)) )?.map((chat, index) => (
                    //     <MsgListItem key={index} text="Hello" chat={chat} matchId={businessAccountID} />
                    // ))
                }

            </div>

            <div className="app-flex-row align-items-center justify-content-between bg-black py-3 mt-4 px-3" style={{ fontSize: '20px' }}>
                <FaCamera />
                    <input type="text" placeholder="Type message here..." value={msg} onChange={(e) => setMsg(e.target.value)}
                    className="send-message-input" onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
                <FaPaperPlane onClick={sendMessage} />
            </div>

        </div>

    );

}

export default SendMessage;
