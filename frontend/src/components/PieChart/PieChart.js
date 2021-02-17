import React, { useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ inputData, outRadius, inRadius }) => {

    // Define initial data used for pie chart
    const data = inputData;
    const outerRadius = outRadius;
    const innerRadius = inRadius;

    useEffect(() => {
        // Define margins for the svg
        const margin = {
            top: 0, right: 20, bottom: 20, left: 20,
        };
    
        // Define the dimensions of the pie chart
        const width = 2 * outerRadius + margin.left + margin.right;
        const height = 2 * outerRadius + margin.top + margin.bottom;
    
        // Define the color scale via D3 interpoation
        const colorScale = d3     
            .scaleSequential()      
            .interpolator(d3.interpolateCool)      
            .domain([0, data.length]);
            
        const drawChart = () => {
            // Remove any existing svg to render new one
            d3.select('#pie-chart')
                .select('svg')
                .remove();
    
            // Create a new svg to render chart
            const svg = d3
                .select('#pie-chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
            // Create the arcs and pie pieces
            const arcGenerator = d3
                .arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);
    
            const pieGenerator = d3
                .pie()
                .padAngle(0)
                .value((d) => d.value);
    
            const arc = svg
                .selectAll()
                .data(pieGenerator(data))
                .enter();
    
            // Add each pieces of the chart
            arc
                .append('path')
                .attr('d', arcGenerator)
                .style('fill', (_, i) => colorScale(i))
                .style('stroke', '#ffffff')
                .style('stroke-width', 0)
                .append("svg:title")
                .text(function(d) { return `${d.data.label}: ${d.value}`; });
    
            // Add label to each piece of the chart
            arc
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('stroke', '#ffffff')
                .text((d) => d.data.label)
                .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y})`;
                });
        }
        drawChart();
    }, [data]);

  return <div id="pie-chart" />;
}

export default PieChart;