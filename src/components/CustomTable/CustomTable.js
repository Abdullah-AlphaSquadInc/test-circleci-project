import React from 'react';

import { Table } from 'react-bootstrap';

const CustomTable = (props) => {

    const { headings, children } = props;

    return (

        <Table responsive borderless size="sm">

            <thead>
                <tr>
                    { headings.map((head, index) => ( 
                        <th key={index} className="text-white"
                        style={{ fontSize: '15px', width: '20%' }}> 
                            {head} 
                        </th> 
                    )) }
                </tr>
            </thead>

            <tbody className="text-white cursor-pointer-sort">
                {children}
            </tbody>

        </Table>

    );

}
 
export default CustomTable;