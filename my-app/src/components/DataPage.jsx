import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../data_page.css"; 

const DataPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const allRecords = location.state?.records || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedTitles, setExpandedTitles] = useState({});

  const recordsPerPage = 3;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(allRecords.length / recordsPerPage);

  const toggleTitle = (index) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [index]: !prev[index], 
    }));
  };

  return (
    <div className="data-page-container">
      <div className="container">
        <h1>Detailed Data View</h1>

        <div>
          {currentRecords.map((item, index) => (
            <div key={index} className="card">
              <h2 
                className="clickable-title"
                onClick={() => toggleTitle(index)}
              >
                {expandedTitles[index] ? item.title : item.title.substring(0, 80) + (item.title.length > 80 ? "..." : "")}
              </h2>

              <div className="card-content">
                {Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    <span className="label">{key}:</span>
                    <span className="value">{value || "None"}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            className="button button-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            className="button button-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next 
          </button>

          <button
            className="button button-secondary"
            onClick={() => navigate("/")}
          >
            Back to Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
