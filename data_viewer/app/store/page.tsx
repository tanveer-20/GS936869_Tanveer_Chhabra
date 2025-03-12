"use client";
import { convertExcelToJson } from "../lib/excelToJson";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";

import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
const StorePage = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    //console.log("Fetching data...");
    const fetchData = async () => {
      try {
        const response = await fetch("/Store.json");
        const data = await response.json();
        //console.log("Data fetched:", data);
        setRowData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const columnDefs = [
    { headerName: "Seq No.", field: "Seq No.", sortable: true, filter: true },
    { headerName: "ID", field: "ID", sortable: true, filter: true },
    { headerName: "Label", field: "Label", sortable: true, filter: true },
    { headerName: "City", field: "City", sortable: true, filter: true },
    { headerName: "State", field: "State", sortable: true, filter: true },
  ];
  console.log("Row Data:", rowData);
  //console.log("Column Definitions:", columnDefs);

  return (
    <div className=" justify-center ag-theme-alpine h-[520px] w-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowModelType="clientSide"
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default StorePage;
