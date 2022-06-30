import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Router>
      <App />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  // </React.StrictMode>
);
