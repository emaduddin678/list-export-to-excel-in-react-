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
import HistoryPage from "./pages/historyPage/HistoryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="history" element={<HistoryPage />} />
            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
