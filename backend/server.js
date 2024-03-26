const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const multer = require("multer");
const uploadExpress = require("express-fileupload");
const app = express();
const fs = require("fs");
const Papa = require("papaparse");
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");
const csvjson = require("csvjson");
const { parse } = require("path");
const nodemailer = require("nodemailer");
const path = require("path");
const { trace } = require("console");

var corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:8080"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "welcome to bell" });
});

db.sequelize
  .sync()
  .then(() => {
    console.log("synced db");
  })
  .catch((err) => {
    console.log("error while sync db" + err.message);
  });

//devv ai

// const upload = multer({ dest: "uploads/" });

// app.post("/upload", upload.single("csvFile"), (req, res) => {
//   const filePath = req.file.path;
//   console.log(filePath);
//   const readStream = fs.createReadStream(filePath);
//   let parsedData = [];

//   Papa.parse(readStream, {
//     header: true,
//     step: function (result) {
//       parsedData.push(result.data);
//     },
//     complete: function () {
//       console.log(parsedData);
//       res.json(parsedData);
//     },
//   });
// });

// own merge

const upload = multer({ dest: "uploads/" });

let recipients = [];
let pdfFilePaths = {};

console.log("-----------recipiets-------------");
console.log(recipients);

app.post("/importRecipients", upload.single("csvFile"), (req, res) => {
  const filePath = req.file.path;
  console.log(filePath);
  const readStream = fs.createReadStream(filePath);
  let parsedData = [];

  Papa.parse(readStream, {
    header: true,
    step: function (result) {
      parsedData.push(result.data);

      recipients = parsedData;
      console.log("recipientsssss", recipients);
      //  const pdfFiles = [];
      recipients.forEach((recipient, _idx) => {
        const pdfContent = `Name: ${recipient.campaign_name}\nEmail: ${recipient.campaign_email}\nBalance: ${recipient["Department"]}`;
        const pdfFileName = `${recipient.campaign_email}.pdf`;
        // console.log(pdfFileName);
        const pdfFilePath = `pdfs/${pdfFileName}`;
        fs.writeFileSync(pdfFilePath, pdfContent);
        // pdfFiles.push(pdfFilePath);
        pdfFilePaths[recipient.campaign_email] = pdfFilePath;
      });
    },

    complete: function () {
      console.log("parsedData", parsedData);
      console.log("-----------pdfFilepa-------------");
      console.log(pdfFilePaths);
      res.status(200).json(parsedData);
    },
  });
});

// alterative method
app.get("/sendMail", async (req, res) => {
  const { pdfFiles } = req.body;

  console.log("email send process begins >>>>>>>>>>>>>>.");

  const testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    // host: "",
    port: 465, //uses port 465 if secure is true.
    secure: true,
    service: "gmail",
    auth: {
      user: "testmailfstar@gmail.com",
      pass: "wbrk wklc fldq jrmk",
    },
  });

  Object.values(pdfFilePaths).forEach(async (pdfFilePath) => {
    console.log(pdfFilePath);
    let mailoptions = await transporter.sendMail({
      from: "testmailfstar@gmail.com", // sender address
      to: "ramsanjaydev08@gmail.com", // list of recipients
      subject: "mass ah geut ah", // Subject line
      text: "My first Nodemailer email!", // plain text body
      html: "<b>My first Nodemailer email!</b>", // html body
      attachments: [
        {
          filename: path.basename(pdfFilePath),
          path: pdfFilePath,
        },
      ],
    });

    transporter.sendMail(mailoptions, (error, info) => {
      if (error) {
        console.log("errir sending mail", error);
      } else {
        console.log("emil send", info.response);
      }
    });
    console.log(mailoptions + "waas sent");
  });
  res.json({ message: "email done" });
});

app.get("/pdf", (req, res) => {
  console.log("srver email, works");
  const email = req.query.email;
  console.log(req.query);
  const pdfPath = path.join(__dirname, "pdfs", `${email}.pdf`);
  console.log(pdfPath);
  if (fs.existsSync(pdfPath)) {
    res.send(pdfPath);
  } else {
    res.status(404).send("PDF not found");
  }
});

//server.js here comes the below commented lines

app.get("/viewPdfUrl", (req, res) => {
  const email = req.query.email;

  // Check if email query parameter is provided
  if (!email) {
    return res.status(400).json({ error: "Email parameter is required." });
  }

  // Construct the PDF file URL based on the email address
  const pdfUrl = `http://localhost:8080/pdfs/${email}.pdf`; // Adjust the URL as needed

  // Send the PDF file URL as a response
  res.json({ pdfUrl });
});

require("./app/routes/app.routes")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server is runneign", PORT);
});
