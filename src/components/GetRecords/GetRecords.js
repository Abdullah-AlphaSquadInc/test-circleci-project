import React from 'react';
import { Loading } from '../Loading/Loading';

const GetRecordsRender = (props) => {

    const { arr, loader, table, colSpan, children } = props;

    if(loader && !table)
        return <div className="w-100 pb-2 text-center"><Loading size="sm" variant="white" /></div>;

    else if(loader && table)
        return <tr><td colSpan={colSpan} className="pt-3 text-center"> <Loading size="sm" variant="white" /> </td></tr>;
    
    else if(arr?.length === 0)
        return <div className="w-100 pb-2 text-center text-white">No record found!.</div>;

    return children;

}
 
export default GetRecordsRender;