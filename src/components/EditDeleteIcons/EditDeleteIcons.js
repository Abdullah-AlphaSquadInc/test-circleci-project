import React from 'react';
import './EditDeleteIcons.css';

import { MdDelete } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import { FiPlusCircle } from 'react-icons/fi';
import { AiFillEye } from 'react-icons/ai';

export const EditDeleteIcons = ({ clickEdit, clickDelete, showOnlyAdd, shoeEyeWithAddDelete }) => {

    return(

        <div className="app-flex-row align-items-center w-auto">
            
            {
                showOnlyAdd ?
                    <FiPlusCircle className="add-icon" onClick={(e) => clickEdit(e)} />
                :
                shoeEyeWithAddDelete ? 
                <>
                    <AiFillEye className="edit-del-icon-witheye mr-2" />
                    <HiPencil className="edit-del-icon-witheye mr-2" onClick={() => clickEdit()} />
                    <MdDelete className="edit-del-icon-witheye" onClick={() => clickDelete()} />
                </>
                :
                <>
                    <HiPencil className="edit-del-icon mr-2" onClick={() => clickEdit()} />
                    <MdDelete className="edit-del-icon" onClick={() => clickDelete()} />
                </>
            }

        </div>

    );

}