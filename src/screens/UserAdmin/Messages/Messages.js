import React, { useState, Fragment, useEffect } from 'react';
import './Messages.css';

import { BiMessageDetail } from 'react-icons/bi';
import ChildrenContainer from '../../../components/ChildrenContainer/ChildrenContainer';
import {TopBar} from '../../../components/TopBar/TopBar';
import TwoColumnLayout from '../../../components/TwoColumnLayout/TwoColumnLayout';
import { Loading } from '../../../components/Loading/Loading';
import MessageList from './MessageList/MessageList';
import SendMessage from './SendMessage/SendMessage';
import { getChatUsers } from '../../../utilities/CommonMethods';
import firebase from '../../../helpers/firebaseHelpers';
import moment from "moment";

const Message = () => {

    const [loadThreads, setLoadThreads] = useState(false);
    const [loadThreadsChats, setLoadThreadsChats] = useState(false);

    const [allThreads, setAllThreads] = useState([]);
    const [allThreadsChats, setAllThreadsChats] = useState([]);

    const [selectedThreadId, setSelectedThreadId] = useState(0);
    const [senderReceiver, setSenderReceiver] = useState({ receiver: undefined, sender: undefined });

    const businessAccountID = localStorage.getItem('businessAccountId');

    useEffect(() => {
        getChatThreads();

        return () => {
            setAllThreads([]);
            setLoadThreads(false);
        }
    }, [])

    useEffect(() => {
        getThreadsChats();
    }, [selectedThreadId])

    const showParticularChat = (thread, receiver, sender) => {
        setSelectedThreadId(thread?.id);
        setSenderReceiver({ receiver: receiver, sender: sender });
    }

    const getChatThreads = () => {
        setLoadThreads(true);

        firebase.getRecordsWithCollection("ChatThreads", (res) => {
           const { success, data } = res;

           if(success){
                const result = data?.filter((thread) => thread?.participants?.includes(businessAccountID));
                setAllThreads(result);
                if(result?.length){
                    setSelectedThreadId(result[0]?.id);
                    const { receiver, sender } = getChatUsers(result[0]?.user1, result[0]?.user2, businessAccountID);
                    setSenderReceiver({ receiver: receiver, sender: sender });
                }
                setLoadThreads(false);
           }
        });
    }

    const getThreadsChats = () => {
        setLoadThreadsChats(true);

        firebase.getRecordsWithCollection("Chat", (res) => {
            const { success, data } = res;

            if(success){
                const result = data?.filter((chat) => chat?.threadId === selectedThreadId);
                if (result) {
                    result.sort(function(x, y){
                        return moment(x.createdAt).diff(moment(y.createdAt));
                    })
                }


                setAllThreadsChats(result);
                setLoadThreadsChats(false);
            }
         });
    }

    const postMessage = (msg) => {
        const { sender, receiver } = senderReceiver;
        if(sender && receiver){
            const data = { sender, receiver, message: msg, threadId: selectedThreadId, createdAt: new Date().getTime() };
            firebase.setRecordsWithCollection("Chat", "", data, (res) => {
                getThreadsChats();
                const data2 = { message: msg };
                firebase.updateRecordsWithCollection("ChatThreads", selectedThreadId, data2, (res) => {
                    getChatThreads();
                });
            });
        } else{
            alert('sender or receiver not exist.');
        }
    }

    return(

        <Fragment>

            <TopBar icon={<BiMessageDetail className="side-icons mr-2" />} heading="messages" />

            <ChildrenContainer>

                <TwoColumnLayout
                    leftWidth="382px"
                    leftSide={

                        <div className="app-flex-column align-items-start py-2 w-100">

                            {
                                loadThreads ? <div className="text-center w-100"><Loading size="sm" variant="white" /></div> :
                                allThreads.length === 0 ? <div>No Threads Found.</div> :
                                allThreads.map((thread, index) => (
                                    <MessageList
                                        key={index} threadId={thread?.id} selectedThreadId={selectedThreadId}
                                        chooseItem={(thread, receiver, sender) => showParticularChat(thread, receiver, sender)}
                                        businessAccountID={businessAccountID}
                                        thread={thread}
                                    />
                                ))
                            }

                        </div>

                    }
                >

                    <div className="two-column-layout-right overflow-auto mh-100">
                        <SendMessage loadThreadsChats={loadThreadsChats} allThreadsChats={allThreadsChats}
                         businessAccountID={businessAccountID}
                         postMessage={(msg) => postMessage(msg)}
                        />
                    </div>

                </TwoColumnLayout>

            </ChildrenContainer>

        </Fragment>

    );

}

export default Message;
