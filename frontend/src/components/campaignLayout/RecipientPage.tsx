import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router";

const RecipientPage = () => {
  const [checked, setChecked] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  //   const { email } = useParams();

  const search = useLocation().search;
  const email = new URLSearchParams(search).get("email");
  console.log(email);
  const handleSubmit = async () => {
    console.log("submted butm");
    // Handle form submission (e.g., send the agreement to the backend)
  };

  // Fetch the PDF URL based on the unique ID from the URL params
  useEffect(() => {
    const fetchPdfUrl = async () => {
      // const uniqueId = match.params.uniqueId;
      console.log("working");
      try {
        const response = await axios.get(
          `http://localhost:8080/pdf?email=${email}`
        );
        console.log(response.data);

        setPdfUrl(response.data);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };
    fetchPdfUrl();
  }, [email]);

  console.log(pdfUrl);

  return (
    <div>
      <h1>View PDF and Agree</h1>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Viewer"
        ></iframe>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          I agree with the content of the PDF.
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecipientPage;
