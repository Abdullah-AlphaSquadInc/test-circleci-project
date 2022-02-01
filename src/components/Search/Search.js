import React from 'react';
import './Search.css';
import { FaSearch } from 'react-icons/all';

export const Search = (props) => {
    return <div className="w-100 position-relative">
            <input 
                type="text"
                placeholder="Search"
                className="search-field"
                {...props}
            />
            <FaSearch className="search-field-icon" />
    </div>
}