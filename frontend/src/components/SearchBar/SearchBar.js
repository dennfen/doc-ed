import React from 'react';
import './SearchBar.scss';

const SearchBar = ({ searchHandler, searchValue }) => {
    
    // Handle search bar input
    const searchInputHandler = event => {
        searchHandler(event)
    }

    return (
        <>
            <input
                className='search-bar'
                type='text'
                name='searchValue'
                value={searchValue}
                onChange={searchInputHandler} />
        </>
    );
};

export default SearchBar;