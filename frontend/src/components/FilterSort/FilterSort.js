import React from 'react';
import './FilterSort.scss'

const FilterSort = ({ handleSortFilter, techSelection, projectSelection }) => {
    
    const handleSorting = event => {
        handleSortFilter('sort', event.target.value)
    }

    const handleSortOrder = event => {
        handleSortFilter('sortOrder', event.target.checked)
    }

    const handleStatusChange = event => {
        handleSortFilter('filterStatus', event.target.value)
    }

    const handleTechChange = event => {
        handleSortFilter('filterTech', event.target.value)
    }

    const handleProjectChange = event => {
        handleSortFilter('filterProject', event.target.value)
    }

    return (
        <div className='filter-sort'>
            <div className='filter-sort__container'>
                <h2 className='filter-sort__heading'>Sort</h2>
                <select className='filter-sort__select' name='sortSelection' onChange={handleSorting}>
                    <option value='id'>Bug ID</option>
                    <option value='technology'>Language</option>
                </select>
                <div className="filter-sort__switch">
                    <label className='filter-sort__switch-label'>
                        <input className='filter-sort__input' type="checkbox" name='descOrder' onChange={handleSortOrder} />
                        <span className="filter-sort__box"></span>
                    </label>
                    <label className='filter-sort__label' htmlFor='descOrder'>Descending</label>
                </div>
            </div>
            
            <div className='filter-sort__container'>
                <h2 className='filter-sort__heading'>Filter</h2>
                <label className='filter-sort__label' htmlFor='filterStatus'>Status</label>
                <select className='filter-sort__select' name='filterStatus' defaultValue='outstandingTrue' onChange={handleStatusChange}>
                    <option value='all'>All</option>
                    <option value='outstandingFalse'>Closed</option>
                    <option value='outstandingTrue'>Outstanding</option>
                </select>
                <label className='filter-sort__label' htmlFor='filterTech'>Language</label>
                <select className='filter-sort__select' name='filterTech' onChange={handleTechChange}>
                    <option value=''>All</option>
                    {techSelection.map(tech =>
                        <option key={tech} value={tech}>{tech}</option>
                    )}
                </select>
                <label className='filter-sort__label' htmlFor='filterProject'>Project</label>
                <select className='filter-sort__select' name='filterProject' onChange={handleProjectChange}>
                    <option value=''>All</option>
                    {projectSelection.map(project =>
                        <option key={project} value={project}>{project}</option>
                    )}
                </select>
            </div>
        </div>
    );
};

export default FilterSort;