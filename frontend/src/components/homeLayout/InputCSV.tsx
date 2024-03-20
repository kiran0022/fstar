import { FileDown } from "lucide-react";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import axios from "axios";

export default function InputCSV() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
    if (selectedFile) {
      console.log("properly reciveed");
    }
  };

  console.log(selectedFile);
  const handleFileUpload = async () => {
    if (selectedFile) {
      console.log("uploading files");

      const formData = new FormData();

      formData.append("csvFile", selectedFile);

      console.log(formData);

      console.log("form data loding");

      try {
        const response = await axios.post(
          "http://localhost:8080/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setParsedData(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  console.log(parsedData);
  return (
    <div>
      <input
        type="file"
        // className="absolute w-32 h-8 bg-transparent opacity-0 "
        accept=".csv"
        onChange={handleFileChange}
      />
      <Button variant="outline">
        <FileDown className="inline-block" /> upload excel
      </Button>
      <button onClick={handleFileUpload}>confirm</button>
    </div>
  );
}
