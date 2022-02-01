import React from 'react';

import './getButtons.css';

import { Button } from 'react-bootstrap';

export const GetButtons = (props) => {

    const { title1, title2, title3, click1, click2, click3, className } = props;

    return(

        <div className={`app-flex-row align-items-center get-buttons ${className}`}>
            <Button onClick={click1}>
                {title1}
            </Button>

            {
                title2 && 
                <Button onClick={click2}>
                    {title2}
                </Button>
            }
            
            {
                title3 &&
                <Button onClick={click3}>
                    {title3}
                </Button>
            }

        </div>

    );

}