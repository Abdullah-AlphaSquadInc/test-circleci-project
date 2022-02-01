import React, { useState } from 'react';
import { EditDeleteIcons } from '../../../../components/EditDeleteIcons/EditDeleteIcons';

import { Loading } from '../../../../components/Loading/Loading';
import { comaSeparateNames } from '../../../../utilities/CommonMethods';

const CategoryItem = (props) => {
    
    const { editCategory, item, deleteCategory, delLoading } = props;

    const [cId, setCId] = useState('');

    return(

        <tr>
            <td style={{ width: '25%' }}>{ item?.category }</td>
            <td style={{ width: '25%' }}> { item?.subCategory } </td>
            <td style={{ width: '25%' }}>{ item?.type }</td>
            <td style={{ width: '25%' }}>
                <div className="align-items-center app-flex-row justify-content-between">
                    
                    <div>{ item?.name }</div>

                    <div>
                        
                        {
                            (delLoading && item?.id === cId) ? <Loading size="sm" variant="white" />
                            :
                            <EditDeleteIcons 
                                clickEdit={() => editCategory(item)} 
                                clickDelete={() => {
                                    setCId(item?.id);
                                    deleteCategory(item);
                                }} 
                            />
                        }

                    </div>

                </div>
            </td>
        </tr>

    );

}
 
export default CategoryItem;