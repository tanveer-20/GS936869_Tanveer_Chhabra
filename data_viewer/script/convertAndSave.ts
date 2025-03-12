import * as XLSX from "xlsx";

import fs from "fs";

export const convertExcelToJson = async (filePath: string): Promise<void> => {
  try {
    const response = await fetch(filePath);

    console.log(response);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheets = workbook.Sheets;

    for (const sheet in sheets) {
      const jsonData = XLSX.utils.sheet_to_json(sheets[sheet]);

      fs.writeFile(`sheets/${sheet}.json`, JSON.stringify(jsonData), (err) => {
        if (err) {
          console.error("Error writing JSON:", err);
        } else {
          console.log("JSON file created successfully.");
        }
      });
    }

    console.log(workbook.Sheets);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // const worksheet = workbook.Sheets[sheetName];
  // if (!worksheet) {
  //   throw new Error(`Sheet "${sheetName}" not found in the workbook.`);
  // }
  // const jsonData = XLSX.utils.sheet_to_json(worksheet);

  // return jsonData;
};

convertExcelToJson(
  "C:/Users/hp/Desktop/test/GS936869_Tanveer_Chhabra/data_viewer/public/data.xlsx"
);
