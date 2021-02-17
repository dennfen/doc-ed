import './Modal.scss';
import React, { Component } from 'react';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

class Modal extends Component {
    
    // Handle event for when modal is closed
    handleClose = event => {
        event.preventDefault();
        this.props.close(event);
    }

    render() {
        return (
            <>
                {this.props.show && (
                    <motion.div
                        key='modal'
                        className='modal'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            key='modal-content'
                            className='modal__content'
                        >
                            <button className='modal__close' onClick={this.handleClose}>❌</button>
                            {this.props.children}
                        </motion.div>
                    </motion.div>
                )}
            </>
        );
    }
}

export default Modal;