import React, { Component } from 'react';
import axios from 'axios';
import { createSet } from '../../utils/utils';
import { ForceGraph2D } from 'react-force-graph';
import { BASE_URL, colorPalette } from '../../utils/utils';
import Legend from '../Legend/Legend';
import Modal from '../Modal/Modal';
import BugDetails from '../BugDetails/BugDetails';
import { motion } from 'framer-motion';
import './VisualGraph.scss';

class VisualGraph extends Component {
    state = {
        graphData: null,
        lang: null,
        isModalOpen: false,
        selectBug: ''
    }

    // Fetch graph data via unique endpoint
    fetchBugVisual = () => {
        axios
            .get(`${BASE_URL}/api/visual`)
            .then(result => {                
                const fullList = result.data;
                
                // Creating center node and parent node for each bug
                let nodes = fullList.map(({ id, target, title }) => ({
                    id: id,
                    color: colorPalette[target],
                    name: title
                }));

                const finalArr = createSet(fullList, 'target')
                
                // Parent node - 1 per programming language
                const parentNode = finalArr.map(lang => ({
                    id: lang,
                    color: colorPalette[lang],
                    name: lang
                }))

                // Center node - representing self
                const selfNode = [{
                    id: 'You',
                    color: '#FFFFFF',
                    name: 'You'
                }]

                nodes = [...nodes, ...parentNode, ...selfNode]
                
                // Creating links between each node to its parent node and center node
                let links = fullList.map(({ source, target }) => ({
                    source: source,
                    target: target,
                    color: '#CCCCCC'
                }));

                const parentLink = parentNode.map(({ id }) => ({
                    source: id,
                    target: 'You',
                    color: '#CCCCCC'
                }))

                links = [...links, ...parentLink]

                // Set state of completed data for force graph component to utilize
                const graphObject = {
                    nodes: nodes,
                    links: links
                }

                this.setState({
                    graphData: graphObject,
                    lang: parentNode
                })
            })
            .catch(error => {
                console.log(`GET Visuals error: ${error}`)
            })
    }

    // Handle when a bug node is clicked
    handleNodeclick = event => {
        const bugID = parseInt(event.id);
        
        if (bugID) {
            axios
                .get(`${BASE_URL}/api/bugs/${bugID}/`)
                .then(result => {
                    this.setState({
                        selectBug: result.data,
                        isModalOpen: true
                    })
                })
        }
    }

    // Handle bug node modal close
    handleModalClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    // Fetch data on compponent mount
    componentDidMount() {
        this.fetchBugVisual();
    }
    
    render() {
        return (
            <>
                <motion.div className='visual-graph'
                    key='graph'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {this.state.graphData && 
                        <ForceGraph2D
                            graphData={this.state.graphData}
                            backgroundColor={'none'}
                            width={1500}
                            height={900}
                            nodeRelSize={5}
                            nodeOpacity={1}
                            linkWidth={1}
                            linkOpacity={0.5}
                            onNodeClick={this.handleNodeclick}
                        />
                    }
                </motion.div>
                
                <motion.div
                    className='visual-graph__legend-container'
                    key='graph-legend'
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8 }}
                >
                    {this.state.lang && this.state.lang.map(lang =>
                        <Legend
                            key={lang.name}
                            language={lang.name}
                            color={lang.color}
                        />
                    )}
                </motion.div>
                
                <Modal show={this.state.isModalOpen} close={this.handleModalClose}>
                    <BugDetails bug={this.state.selectBug} />
                </Modal>
            </>
        );
    }
}

export default VisualGraph;