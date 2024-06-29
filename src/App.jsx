import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import DataGridPage from "./DataGridPage/DataPage";
// import ExportToExcel from "./ExcelSheet/ExcelFile";
import Test from "./components/ExcelSheet/ExcelFile";
import DashBoard from "./pages/dashboard/DashBoard";

function App() {

  return (
    <>
      <DashBoard />
    </>
  );
}

export default App;
