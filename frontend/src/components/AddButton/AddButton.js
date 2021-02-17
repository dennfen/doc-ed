import React from 'react';
import './AddButton.scss';

const AddButton = ({ addModal }) => {

    // Handle when '+' button is clicked
    const handleAddClick = event => {
        event.preventDefault();
        addModal(event);
    }

    return (
        <>
            <button className='add-button' onClick={handleAddClick}>+</button>
        </>
    );
};

export default AddButton;