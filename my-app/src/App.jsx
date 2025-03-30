import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./components/AdminPage.jsx";
import DataPage from "./components/DataPage.jsx";
import DataChart from "./pages/DataChart";
import "./admin_page.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/dashboard" element={<DataChart />} />
      </Routes>
    </Router>
  );
}

export default App;


