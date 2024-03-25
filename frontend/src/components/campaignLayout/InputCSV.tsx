import { FileDown } from "lucide-react";
import { Button } from "../ui/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCampaignStore } from "@/store/campaignStore";

export default function InputCSV({ setRecipients }: any) {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [parsedData, setParsedData] = useState<IRecipient[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // const recipientData = useCampaignStore((state) => state.recipients);
  // const setRecipient = useCampaignStore((state) => state.setRecipient);

  const handleClick = (event) => {
    inputRef.current!.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileSelected = event.target.files?.[0];

    if (fileSelected) {
      const formdata = new FormData();
      formdata.append("csvFile", fileSelected);

      try {
        const response = await axios.post(
          "http://localhost:8080/importRecipients",
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // setRecipients((prevData) => [
        //   ...prevData,
        //   response.data.map((item) => {
        //     console.log(item);
        //     return prevData.;
        //   }),
        // ]);

        setRecipients((prevDataArray) => {
          console.log(prevDataArray);
          // Clone the existing array to avoid mutating state directly
          const newArray = [...prevDataArray];
          // Add new data to the cloned array
          // newArray.push(response.data);

          response.data?.map((item) => {
            console.log(item);
            newArray.push(item);
          });

          // Set the state with the modified array
          return newArray;
        });

        // upadateRecipient(response.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // const handleFileUpload = async () => {
  //   if (selectedFile) {
  //     const formData = new FormData();

  //     formData.append("csvFile", selectedFile);

  //     try {
  //       const response = await axios.post(
  //         // "http://localhost:8080/upload",
  //         "http://localhost:8080/importRecipients",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       setParsedData(response.data);

  //       setSelectedFile(null);
  //     } catch (error) {
  //       // setRecipients((existingData: any) => [
  //       //   ...existingData,
  //       //   response.data,
  //       // ]);

  //       console.error("Error uploading file:", error);
  //     }
  //   }
  //   parsedData.map((data) => {
  //     setRecipients((prevData) => [...prevData, data]);
  //   });

  //   console.log(parsedData);
  // };

  // useEffect(() => {
  //   setRecipients((existingData: any) => [...existingData, data]);
  // }, [parsedData, setRecipients]);

  return (
    <div>
      <input
        type="file"
        // className="absolute w-32 h-8 bg-transparent opacity-0 "
        accept=".csv"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button variant="outline" onClick={handleClick}>
        <FileDown className="inline-block" /> upload excel
      </Button>
      {/* <button onClick={handleClick}>confirm</button> */}
    </div>
  );
}
