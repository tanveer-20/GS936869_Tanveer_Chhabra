"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";

import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Sku = () => {
  const [skuData, setSkuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch("/Sku.json");
        const data = await response.json();
        //console.log("Data fetched:", data);
        setSkuData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const columnDefs = [
    { headerName: "Id", field: "ID", sortable: true, filter: true },
    { headerName: "Label", field: "Label", sortable: true, filter: true },
    { headerName: "Class ", field: "Class", sortable: true, filter: true },
    {
      headerName: "Department",
      field: "Department",
      sortable: true,
      filter: true,
    },

    { headerName: "Price ", field: "Price", sortable: true, filter: true },

    { headerName: "Cost ", field: "Cost", sortable: true, filter: true },
  ];

  return (
    <>
      <div className=" justify-center ag-theme-alpine h-[520px] w-full">
        <AgGridReact
          rowData={skuData}
          rowModelType="clientSide"
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </>
  );
};
export default Sku;
