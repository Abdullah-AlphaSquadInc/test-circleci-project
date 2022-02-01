import React from 'react';

import { Avatar } from '../../../../components/Avatar/Avatar';
import { convertDate, getChatUsers } from '../../../../utilities/CommonMethods';

const MessageList = (props) => {

    const { chooseItem, threadId, selectedThreadId, thread, businessAccountID } = props;

    const { receiver, sender } = getChatUsers(thread?.user1, thread?.user2, businessAccountID);

    return (

        <div className={`app-flex-row py-3 px-1 position-relative ${ selectedThreadId === threadId ? 'bg-chatList rounded ease-out' : '' } `}
        onClick={() => chooseItem(thread, receiver, sender)}>

            <Avatar name="name" src={receiver?.image} medium chats />

            <div className="app-flex-column align-items-start ml-3 w-100">

                <div className="app-flex-row align-items-center justify-content-between mb-1">
                    <h6>{receiver?.name}</h6>
                    <span style={{ fontSize: '13px' }}>
                        { new Date(thread?.createdAt).toLocaleDateString() }
                    </span>
                </div>

                <p className="text-greyDark">
                    {thread?.message}
                </p>

            </div>

        </div>

    );

}

export default MessageList;
