import csvjson from "csvjson";
import { usePapaParse } from "react-papaparse";
import csv from "csvtojson";

let arr = [
  {
    "campaign_email;campaign_name;duration;start_date;created_by;process;actions/copy;actions/send;db_code;balance;campaign_mobile;status;final_action":
      "rachel@example.com;rachel;150;2022-10-31T09:00:00.594Z;luna;ongoing;false;true;223422;623234;1234567890;pending;null",
  },

  {
    "campaign_email;campaign_name;duration;start_date;created_by;process;actions/copy;actions/send;db_code;balance;campaign_mobile;status;final_action":
      "mahima@example.com;mahima;150;2022-10-31T09:00:00.594Z;luna;ongoing;false;true;223422;623234;1234567890;pending;null",
  },

  {
    "campaign_email;campaign_name;duration;start_date;created_by;process;actions/copy;actions/send;db_code;balance;campaign_mobile;status;final_action":
      "ram@example.com;ram;150;2022-10-31T09:00:00.594Z;luna;ongoing;false;true;223422;623234;1234567890;pending;null",
  },

  {
    "campaign_email;campaign_name;duration;start_date;created_by;process;actions/copy;actions/send;db_code;balance;campaign_mobile;status;final_action":
      "ganesh@example.com;ganesh;150;2022-10-31T09:00:00.594Z;luna;ongoing;false;true;223422;623234;1234567890;pending;null",
  },

  {
    "campaign_email;campaign_name;duration;start_date;created_by;process;actions/copy;actions/send;db_code;balance;campaign_mobile;status;final_action":
      "zaiton@example.com;zaiton;150;2022-10-31T09:00:00.594Z;luna;ongoing;false;true;223422;623234;1234567890;pending;null",
  },
];

// let options = {
//   delimiter: ";", // optional
//   quote: '"', // optional
// };

// // const parsedatas = arr.map((data) => {
// //   console.log(data);
// //   csvjson.toSchemaObject(data, options);
// //   return data;
// // });
// async function Csvtoobj() {
//   const { data, error } = await usePapaParse(arr, {
//     header: true,
//     complete: (results) => {
//       console.log("Parsed CSV data:", results.data);
//       // Further processing of the parsed data can be done here
//     },
//   });

//   console.log(data);
// }
// Csvtoobj();

// async function convertcsv() {
//   const jsonArray = await csv({});
// }

// // console.log(parsedatas);

// csv({
//   noheader: true,
//   output: "csv",
// })
//   .fromString(csvStr)
//   .then((csvRow) => {
//     console.log(csvRow); // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
//   });

// const CSVToJSON = (data, delimiter = ",") => {
//   const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
//   return data
//     .slice(data.indexOf("\n") + 1)
//     .split("\n")
//     .map((v) => {
//       const values = v.split(delimiter);
//       return titles.reduce(
//         (obj, title, index) => ((obj[title] = values[index]), obj),
//         {}
//       );
//     });
// };

// CSVToJSON("col1,col2\na,b\nc,d");
// // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
// CSVToJSON("col1;col2\na;b\nc;d", ";");
// // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
import React, { useState } from "react";

const CsvToJsonConverter = ({ csvDataArray }) => {
  const [jsonDataArray, setJsonDataArray] = useState([]);

  const convertCsvToJson = () => {
    const convertedJsonArray = csvDataArray.map((csvObject) => {
      const csvString = Object.values(csvObject)[0]; // Extracting the CSV string from the object
      const lines = csvString.split("\n");
      const headers = lines[0].split(";");

      const jsonObject = {};
      const dataValues = lines[1].split(";");
      for (let i = 0; i < headers.length; i++) {
        jsonObject[headers[i]] = dataValues[i];
      }

      return jsonObject;
    });

    setJsonDataArray(convertedJsonArray);
  };

  return (
    <div>
      <h2>CSV to JSON Converter</h2>
      <button onClick={convertCsvToJson}>Convert</button>
      {jsonDataArray.map((jsonData, index) => (
        <div key={index}>
          <h3>Converted JSON Data {index + 1}</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default CsvToJsonConverter;
