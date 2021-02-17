import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import BugDetails from '../BugDetails/BugDetails';
import { motion } from 'framer-motion';
import './BugTrackerList.scss';

class BugTrackerList extends Component {
    state = {
        isModalOpen: false
    }
    
    // Handling each click element click
    handleEdit = event => {
        event.preventDefault();
        this.props.clickEdit('edit', this.props.bug.id);
    }

    handleCloseBug = event => {
        event.preventDefault();
        this.props.clickEdit('close', this.props.bug.id)
    }

    handleTitleclick = () => {
        this.setState({
            isModalOpen: true
        })
    }
    
    // Handle modal close
    handleModalClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    // Date convert function from date time string to long date
    convertDate = date => {
        const convertDate = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return convertDate.toLocaleDateString('en-US', options)
    }
    
    render() {
        return (
            <>
                <motion.div
                    layout
                    className='bug-list'
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 200 }}
                    whileHover={{ scale: 1.05, transition: {duration: 0.5} }}
                    transition={{ duration: 0.8 }}
                >
                    <div className='bug-list__content-container'>
                        <div className='bug-list__title-container' onClick={this.handleTitleclick}>
                            {this.props.bug.outstanding ? 
                                <div className='bug-list__indicator--outstanding'></div> :
                                <div className='bug-list__indicator--closed'></div>
                            }
                            <p className='bug-list__id'>{this.props.bug.id}</p>
                            <h2 className='bug-list__title'>{this.props.bug.title}</h2>
                        </div>
                        <div className='bug-list__dates-container'>
                            <p className='bug-list__tech'>{this.props.bug.technology}</p>
                            <p className='bug-list__create'>{this.convertDate(this.props.bug.create_date)}</p>
                            <p className='bug-list__close'>{`${this.props.bug.close_date ? `Closed: ${this.convertDate(this.props.bug.close_date)}` : ''}`}</p>
                        </div>
                        <p className='bug-list__short-desc'>{this.props.bug.short_description}</p>
                    </div>

                    <div className='bug-list__button-container'>
                        <p className={`bug-list__status ${this.props.bug.outstanding ? 'bug-list__status--outsta' : 'bug-list__status--close'}`}>{this.props.bug.outstanding ? 'Outstanding' : 'Closed'}</p>
                        <button className='bug-list__button' onClick={this.handleEdit}>Edit</button>
                        {this.props.bug.outstanding && 
                            <button className='bug-list__button' onClick={this.handleCloseBug}>Close</button>
                        }
                    </div>
                </motion.div>
                
                <Modal show={this.state.isModalOpen} close={this.handleModalClose}>
                    <BugDetails bug={this.props.bug} />
                </Modal>
            </>
        );
    }
};

export default BugTrackerList;