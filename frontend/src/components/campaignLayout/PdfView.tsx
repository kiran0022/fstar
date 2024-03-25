import axios from "axios";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router";
const PdfView = async () => {
  const response = await axios.get("http://localhost:8080/");
  const { src } = useParams();
  const pdfURL = "path_to_pdf_file.pdf";
  return (
    <div>
      <Document file={pdfURL}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};
export default PdfView;
