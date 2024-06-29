import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import DataGridPage from "./DataGridPage/DataPage";
// import ExportToExcel from "./ExcelSheet/ExcelFile";
import Test from "./components/ExcelSheet/ExcelFile";
import DashBoard from "./pages/dashboard/DashBoard";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Login from "./pages/loginPage/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="dashboard" element={<DashBoard />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
