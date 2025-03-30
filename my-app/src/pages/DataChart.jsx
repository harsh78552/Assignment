import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import _ from "lodash"; // Import lodash for debouncing

const DataChart = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    end_year: "",
    source: "",
    swot: "",
  });

  // Debounce API call to avoid too many requests while typing
  useEffect(() => {
    const debouncedFetch = _.debounce(() => {
      fetchData();
    }, 500);
    debouncedFetch();
    return () => debouncedFetch.cancel(); // Cleanup function
  }, [filters]);

  const fetchData = async () => {
    try {
      // Handle None (null or undefined) values in filters
      const cleanedFilters = Object.keys(filters).reduce((acc, key) => {
        acc[key] = filters[key] || ""; // Replace None values with an empty string
        return acc;
      }, {});

      const query = Object.keys(cleanedFilters)
        .map((key) => cleanedFilters[key] && `${key}=${cleanedFilters[key]}`)
        .join("&");

      const response = await axios.get(`http://127.0.0.1:5000/filter-data?${query}`);
      // Handle None (null or undefined) values in the fetched data
      const cleanedData = response.data.map(item => ({
        ...item,
        intensity: item.intensity || 0,
        likelihood: item.likelihood || 0,
        relevance: item.relevance || 0,
      }));
      setData(cleanedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    d3.select("#chart").selectAll("*").remove(); // Clear previous chart

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    if (data.length === 0) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "red")
        .text("No data available");
      return;
    }

    // Scales for visualization
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.intensity, d.likelihood, d.relevance))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Bars for Intensity, Likelihood, Relevance
    svg
      .selectAll(".bar.intensity")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar intensity")
      .attr("x", d => xScale(d.name))
      .attr("y", height - margin.bottom)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", "steelblue")
      .transition()
      .duration(1000)
      .attr("y", d => yScale(d.intensity))
      .attr("height", d => height - margin.bottom - yScale(d.intensity));

    svg
      .selectAll(".bar.likelihood")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar likelihood")
      .attr("x", d => xScale(d.name))
      .attr("y", height - margin.bottom)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", "orange")
      .transition()
      .duration(1000)
      .attr("y", d => yScale(d.likelihood))
      .attr("height", d => height - margin.bottom - yScale(d.likelihood));

    svg
      .selectAll(".bar.relevance")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar relevance")
      .attr("x", d => xScale(d.name))
      .attr("y", height - margin.bottom)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", "green")
      .transition()
      .duration(1000)
      .attr("y", d => yScale(d.relevance))
      .attr("height", d => height - margin.bottom - yScale(d.relevance));

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-20)")
      .style("text-anchor", "end");

    // Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
  };

  return (
    <div>
      <h2>Data Visualization</h2>
      <div className="filters-container">
        <div className="filter-group">
          <label>End Year: </label>
          <input
            type="text"
            placeholder="Enter End Year"
            onChange={(e) => setFilters({ ...filters, end_year: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Topic: </label>
          <input
            type="text"
            placeholder="Enter Topic"
            onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Sector: </label>
          <input
            type="text"
            placeholder="Enter Sector"
            onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Region: </label>
          <input
            type="text"
            placeholder="Enter Region"
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>PEST: </label>
          <input
            type="text"
            placeholder="Enter PEST"
            onChange={(e) => setFilters({ ...filters, pestle: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Source: </label>
          <input
            type="text"
            placeholder="Enter Source"
            onChange={(e) => setFilters({ ...filters, source: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>SWOT: </label>
          <input
            type="text"
            placeholder="Enter SWOT"
            onChange={(e) => setFilters({ ...filters, swot: e.target.value })}
          />
        </div>
      </div>

      <div id="chart" style={{ marginTop: "20px" }}></div>

      <style>
        {`
          .filters-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 20px;
          }

          .filter-group {
            display: flex;
            flex-direction: column;
            width: 200px;
          }

          .filter-group label {
            margin-bottom: 5px;
            font-size: 14px;
          }

          .filter-group input {
            padding: 8px;
            font-size: 14px;
            border-radius: 4px;
            border: 1px solid #ccc;
          }
        `}
      </style>
    </div>
  );
};

export default DataChart;
