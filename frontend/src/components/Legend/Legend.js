import React from 'react';
import './Legend.scss';

const Legend = ({ language, color }) => {
    return (
        <div className='legend'>
            <div style={{backgroundColor: color}} className={`legend__color`}></div>
            <h2 className='legend__title'>{language}</h2>
        </div>
    );
};

export default Legend;