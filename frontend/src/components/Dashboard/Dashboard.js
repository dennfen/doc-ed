import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL, dateDelta, notifyDiscard, notifySuccess } from '../../utils/utils';
import Modal from '../Modal/Modal';
import AddForm from '../AddForm/AddForm';
import AddButton from '../AddButton/AddButton';
import PieChart from '../PieChart/PieChart';
import DonutChart from '../DonutChart/DonutChart';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import './Dashboard.scss';

class Dashboard extends Component {
    state = {
        trackerList: null,
        isModalOpen: false,
        newBug: false,
        avgDelta: null,
        otdCount: null,
        otdTrue: null,
        techSpread: null
    }

    // Fetch data specific to each card via unique enpoints
    fetchData = () => {
        axios
            .get(`${BASE_URL}/api/avg-close/`)
            .then(result => {
                this.setState({
                    avgDelta: dateDelta(result.data)
                })
            })
            .catch(error => {
                console.log(`GET API Error: ${error}`)
            })
        
        axios
            .get(`${BASE_URL}/api/sum-otd/`)
            .then(result => {
                const otdArray = result.data

                const trueValue = otdArray.find(obj => obj.label === 'True') ?
                    otdArray.find(obj => obj.label === 'True').value : 0
                
                this.setState({
                    otdCount: otdArray,
                    otdTrue: trueValue
                })
            })
            .catch(error => {
                console.log(`GET API Error: ${error}`)
            })

        axios
            .get(`${BASE_URL}/api/sum-tech/`)
            .then(result => {
                this.setState({
                    techSpread: result.data
                })
            })
            .catch(error => {
                console.log(`GET API Error: ${error}`)
            })

        this.setState({
            newBug: false
        })
    }
    
    // Handle add button click
    handleAddClick = () => {
        this.setState({
          isModalOpen: true
        })
    }
    
    // Handle modal close
    handleModalClose = () => {
        notifyDiscard()
        this.setState({
            isModalOpen: false
        })
    }
    
    // Followup handler for successful API POST request
    handleNewSubmit = () => {
        notifySuccess();
        this.fetchData();
        this.setState({
            isModalOpen: false,
            newBug: true
        })
    }

    // Refresh bugs list on new bug submission
    componentDidUpdate() {
        this.state.newBug && this.fetchData()
    }

    // Fetch data on component mount
    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        return (
            <>
                <motion.div 
                    key='dashboard'
                    className='dashboard'
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        key='dashboard__card1'
                        className='dashboard__card1'
                        whileHover={{ scale: 1.1 }}
                    >
                        {this.state.otdCount &&                     
                            <DonutChart
                                inputData={this.state.otdCount}
                                outRadius={140}
                                inRadius={100}
                            />
                        }

                        <h1 className='dashboard__outstanding'>{this.state.otdTrue && this.state.otdTrue}</h1>
                        <h2>Outstanding Bugs</h2>
                    </motion.div>
                    
                    <motion.div
                        key='dashboard__card2'
                        className='dashboard__card1'
                        whileHover={{ scale: 1.1 }}
                    >
                        {this.state.techSpread &&                         
                            <PieChart 
                                inputData={this.state.techSpread}
                                outRadius={140}
                                inRadius={0}
                            />
                        }
                        <h2>Project Spread</h2>
                    </motion.div>
                    
                    <motion.div
                        key='dashboard__card3'
                        className='dashboard__card1'
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className='dashboard__days-container'>
                            {this.state.avgDelta && <h1 className='dashboard__delta-num'>{this.state.avgDelta}</h1>}
                            <p className='dashboard__delta-text'>{'Day(s)'}</p>
                        </div>
                        <h2>Average Close</h2>
                    </motion.div>
                </motion.div>
                
                <AddButton addModal={this.handleAddClick} />
                
                <Modal show={this.state.isModalOpen} close={this.handleModalClose}>
                    <AddForm submitBug={this.handleNewSubmit} />
                </Modal>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                <ToastContainer />
            </>
        );
    }
}

export default Dashboard;