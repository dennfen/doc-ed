import React, { Component } from 'react';
import { BASE_URL, sortingData, createSet, notifyDiscard, notifySuccess } from '../../utils/utils';
import axios from 'axios';
import BugTrackerList from '../BugTrackerList/BugTrackerList';
import Modal from '../Modal/Modal';
import EditForm from '../EditForm/EditForm';
import CloseForm from '../CloseForm/CloseForm';
import SearchBar from '../SearchBar/SearchBar';
import FilterSort from '../FilterSort/FilterSort';
import AddForm from '../AddForm/AddForm';
import AddButton from '../AddButton/AddButton';
import { ToastContainer } from 'react-toastify';
import { motion, AnimateSharedLayout } from 'framer-motion';
import './BugTracker.scss';

class BugTracker extends Component {
    state = {
        trackerList: null,
        isModalOpen: false,
        clickedAction: null,
        activeBug: null,
        renderList: null,
        
        searchValue: '',
        filterStatus: 'true',
        filterTech: '',
        filterProject: '',
        sortType: 'id',
        isAscending: true,
    }
    
    // GET request for bug list
    fetchBugTracker = () => {
        axios
            .get(`${BASE_URL}/api/bugs`)
            .then(result => {
                const data = result.data;
                axios
                    .get(`${BASE_URL}/api/bugs-filter?outstanding=${this.state.filterStatus}&technology=${this.state.filterTech}&project=${this.state.filterProject}`)
                    .then(result => {
                        const sortArr = sortingData(result.data, this.state.sortType, this.state.isAscending)

                        this.setState({
                            trackerList: data,
                            renderList: sortArr
                        })
                    })

            })
            .catch(error => {
                console.log(`GET API Error: ${error}`)
            })
    }
    
    // Handle modal click to determine which form to display
    handleActionButton = (action, bugID) => {
        axios
            .get(`${BASE_URL}/api/bugs/${bugID}`)
            .then(result => {
                this.setState({
                    isModalOpen: true,
                    clickedAction: action,
                    activeBug: result.data
                })
            })
            .catch(error => {
                console.log(`GET API Error: ${error}`)
            })
    };

    // Handling modal close
    handleModalClose = () => {
        notifyDiscard();
        this.setState({
            isModalOpen: false
        })
    }

    // Handling of add button modal form
    handleAddClick = () => {
        this.setState({
            clickedAction: 'add',
            isModalOpen: true
        })
    }

    // Edit and Close form submit
    handleSuccessfulSubmit = () => {
        notifySuccess();
        this.setState({
            isModalOpen: false,
        })
    }

    // Form field change handler
    onFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Search handler
    onSearchChange = event => {
        const searchingFor = event.target.value;
        
        const searchedBug = this.state.trackerList.filter(bug => {
            if (
            bug.short_description.toLowerCase().includes(searchingFor.toLowerCase()) || 
            bug.title.toLowerCase().includes(searchingFor.toLowerCase())) {
                return true
            }
            return 0
        })
        
        this.setState({
            [event.target.name]: searchingFor,
            renderList: searchedBug
        });
    }


    // Sort and filter handler
    handleSortFilter = (action, selection) => {
        const currentList = this.state.renderList;
        const userSelection = selection;
        
        if (action === 'sort') {
            const isAscOrder = this.state.isAscending;
            const sortArr = sortingData(currentList, userSelection, isAscOrder)
            this.setState ({
                sortType: userSelection,
                renderList: sortArr,
            })
        } else if (action === 'sortOrder') {
            if (userSelection) {
                this.setState ({
                    isAscending: false
                })
            } else {
                this.setState ({
                    isAscending: true
                })
            }
        } else if (action === 'filterStatus') {
            if (userSelection === 'all') {
                this.setState({
                    filterStatus: ''
                })
            } else {
                const boolSelection = userSelection === 'outstandingTrue' ? true : false
                this.setState({
                    filterStatus: boolSelection
                })
            }
        } else if (action === 'filterTech') {
            if (userSelection === 'all') {
                this.setState({
                    filterTech: ''
                })
            } else {
                this.setState({
                    filterTech: userSelection
                })
            }
        } else if (action === 'filterProject') {
            if (userSelection === 'all') {
                this.setState({
                    filterProject: ''
                })
            } else {
                this.setState({
                    filterProject: userSelection
                })
            }
        }
    }

    // Refreshing bug list
    componentDidUpdate(_prevProps, prevState) {
        if (prevState.isModalOpen !== this.state.isModalOpen ||
            prevState.filterStatus !== this.state.filterStatus ||
            prevState.filterTech !== this.state.filterTech ||
            prevState.filterProject !== this.state.filterProject ||
            prevState.isAscending !== this.state.isAscending ||
            (prevState.searchValue && !this.state.searchValue)
        ) {
            this.fetchBugTracker()
        }
    }

    // Fetch data on component mount
    componentDidMount() {
        this.fetchBugTracker();
    }

    render() {
        return (
            <>
                <motion.div
                    key='tracker'
                    className='bug-tracker'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >                
                    <SearchBar
                        searchHandler={this.onSearchChange}
                        searchValue={this.state.searchValue}
                    />

                    <AnimateSharedLayout>
                        <div className='bug-tracker__list'>
                            {this.state.renderList && this.state.renderList.map((bug) => 
                                <BugTrackerList
                                    key={bug.id}
                                    bug={bug}
                                    clickEdit={this.handleActionButton}
                                />
                            )}
                        
                        {!this.state.renderList &&
                            <h1 className='bug-tracker__no-otd'>No More Bugs !</h1>
                        }
                        </div>
                    </AnimateSharedLayout>
                    
                    
                    {this.state.trackerList && 
                        <FilterSort
                        handleSortFilter={this.handleSortFilter}
                        techSelection={createSet(this.state.trackerList, 'technology')}
                        projectSelection={createSet(this.state.trackerList, 'project')}
                        />
                    }


                    
                    <Modal show={this.state.isModalOpen} close={this.handleModalClose}>
                        {this.state.clickedAction === 'edit' ? 
                            <EditForm 
                            bug={this.state.activeBug}
                            handleSubmit={this.handleSuccessfulSubmit}
                            /> : this.state.clickedAction === 'close' ?
                            <CloseForm 
                            bug={this.state.activeBug}
                            handleSubmit={this.handleSuccessfulSubmit}
                            /> : this.state.clickedAction === 'add' ?
                            <AddForm submitBug={this.handleSuccessfulSubmit} />
                            : ''
                        }
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
                </motion.div>
                
                <AddButton addModal={this.handleAddClick} />
            </>
        );
    }
}

export default BugTracker;