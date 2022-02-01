import { React, useState } from "react";

import { ImageLoader } from '../ContentLoader/ContentLoader';

export const Avatar = ({ src, name, large, medium, chats }) => {
    
    const [ showError, setShowError ] = useState(false);

    const style = {
        width: large ? '100px' : medium ? '70px' : '50px',
        height: large ? '100px' : medium ? '70px' : '50px',
        borderRadius: '50%',
        objectFit: 'cover'
    };

    const error = (e) => {
        setShowError(true);
    }

    if(showError){
        return <ImageLoader chats />;
    }

    if(src && src !== "") {
        return <img alt="" src={src} style={style} onErrorCapture={(e) => error(e)} onError={(e) => error(e)} />;
    } else {
        return <ImageLoader chats />;
    }
}