import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiDatabase, FiUpload, FiBarChart } from "react-icons/fi";
import "../admin_page.css";  // Import the external CSS file

const AdminPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchAllData = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-whole-data");
      const result = await response.json();
      navigate("/data", { state: { records: result } }); // Send data via state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Upload JSON file
  const uploadJson = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/upload_json", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="admin-container">
      {/* Fetch Data Button */}
      <button onClick={fetchAllData} className="button button-blue">
        <FiDatabase className="icon" /> Show All Data
      </button>

      {/* File Upload Section */}
      <div className="file-upload-container">
        <label className="file-upload">
          <input type="file" onChange={handleFileChange} className="hidden" />
          <span className="file-label">📂 Select JSON File</span>
        </label>

        <button onClick={uploadJson} className="button button-orange">
          <FiUpload className="icon" /> Upload JSON
        </button>
      </div>

      {/* Go to Dashboard Button */}
      <button onClick={() => navigate("/dashboard")} className="button button-green">
        <FiBarChart className="icon" /> Go to Dashboard
      </button>
    </div>
  );
};

export default AdminPage;
