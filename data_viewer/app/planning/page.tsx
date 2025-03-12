"use client";
import { convertExcelToJson } from "../lib/excelToJson";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";

import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Planning = () => {
  const [planningData, setPlanningData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       const response = await fetch("/Planning.json");
       const data = await response.json();
        setPlanningData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const columnDefs = [
    { headerName: "Store", field: "Store", sortable: true, filter: true },
    { headerName: "SKU", field: "SKU", sortable: true, filter: true },
    { headerName: "Week", field: "Week", sortable: true, filter: true },
    {
      headerName: "Sales Unit",
      field: "Sales Units",
      sortable: true,
      filter: true,
    },
  ];

  return (
    <>
      <div className=" justify-center ag-theme-alpine h-[520px] w-full">
        <AgGridReact
          rowData={planningData}
          rowModelType="clientSide"
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </>
  );
};
export default Planning;
