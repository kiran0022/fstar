import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipientAgreement = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Fetch the PDF URL based on the unique recipient URL
    const recipientUrl = window.location.href;
    axios
      .get(`http://localhost:3001/getPdfUrl?url=${recipientUrl}`)
      .then((response) => {
        setPdfUrl(response.data);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  }, []);

  const handleAgreementChange = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = () => {
    if (agreed) {
      // Perform action upon agreement
      console.log("Recipient agreed:", agreed);
    } else {
      alert("Please agree to the terms before submitting.");
    }
  };

  return (
    <div>
      {pdfUrl && (
        <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="500px" />
      )}
      <div>
        <input
          type="checkbox"
          checked={agreed}
          onChange={handleAgreementChange}
        />
        <label htmlFor="agreement">I agree to the terms</label>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RecipientAgreement;
