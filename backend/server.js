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
const { Resend } = require("resend");
const PDFDocument = require("pdfkit");

var corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:8080"],
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  var allowedDomains = ["http://localhost:5173", "http://localhost:8080"];
  var origin = req.headers.origin;
  if (allowedDomains.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/pdf", express.static(path.join(__dirname, "pdfs")));

app.use("/public", express.static(path.join(__dirname, "public")));

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
        const doc = new PDFDocument();

        doc.pipe(
          fs.createWriteStream(
            `${path.join(
              __dirname,
              "public",
              "pdfs",
              `${recipient.campaign_email}.pdf`
            )}`
          )
        );

        doc.fontSize(24).text(recipient.campaign_email);
        doc.fontSize(24).text(recipient.campaign_name);
        doc.fontSize(24).text(recipient.balance);
        doc.fontSize(24).text(recipient.duration);

        doc.end();

        const pdfFileName = `${recipient.campaign_email}.pdf`;
        // console.log(pdfFileName);
        // const pdfFilePath = `pdfs/${pdfFileName}`;
        const pdfFilePath = `${path.join(
          __dirname,
          "public",
          "pdfs",
          `${recipient.campaign_email}.pdf`
        )}`;
        // fs.writeFileSync(pdfFilePath, pdfContent);
        // pdfFiles.push(pdfFilePath);
        pdfFilePaths[recipient.campaign_email] = pdfFilePath;

        console.log(pdfFilePath, "---> pdf file path");
      });
    },

    complete: function () {
      console.log(pdfFilePaths);
      res.status(200).json(parsedData);
    },
  });
});

// alterative method (old)

// app.get("/sendMail", async (req, res) => {
//   const { pdfFiles } = req.body;

//   console.log("email send process begins >>>>>>>>>>>>>>.");

//   const testAccount = await nodemailer.createTestAccount();

//   let transporter = nodemailer.createTransport({
//     // host: "",
//     port: 465, //uses port 465 if secure is true.
//     secure: true,
//     service: "gmail",
//     auth: {
//       user: "testmailfstar@gmail.com",
//       pass: "wbrk wklc fldq jrmk",
//     },
//   });

//   Object.values(pdfFilePaths).forEach(async (pdfFilePath) => {
//     console.log(pdfFilePath);
//     let mailoptions = await transporter.sendMail({
//       from: "testmailfstar@gmail.com", // sender address
//       to: "ramsanjaydev08@gmail.com", // list of recipients
//       subject: "mass ah geut ah", // Subject line
//       text: "My first Nodemailer email!", // plain text body
//       html: "<b>My first Nodemailer email!</b>", // html body
//       attachments: [
//         {
//           filename: path.basename(pdfFilePath),
//           path: pdfFilePath,
//         },
//       ],
//     });

//     transporter.sendMail(mailoptions, (error, info) => {
//       if (error) {
//         console.log("errir sending mail", error);
//       } else {
//         console.log("emil send", info.response);
//       }
//     });
//     console.log(mailoptions + "waas sent");
//   });
//   res.json({ message: "email done" });
// });

// using resend (new)
const resend = new Resend("re_DT58EC84_KB3QYQxhu3eBuZMP31NBhYx4");
app.get("/sendEmailResend", async (req, res) => {
  Object.keys(pdfFilePaths).forEach(async (pdfFileName) => {
    console.log(pdfFileName, "filename");
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["testmailfstar@gmail.com", "ramsanjaydev08@gmail.com"],
      subject: "hello world",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
      attachments: [
        {
          path: `${path.join(
            __dirname,
            "public",
            "pdfs",
            `${pdfFileName}.pdf`
          )}`,
          filename: `${pdfFileName}.pdf`,

          // filename: path.basename(pdfFilePath),
          // path: pdfFilePath,
          // http://localhost:8080/public/pdfs/zaiton@example.com.pdf
        },
      ],
      text: "regardS to dev",
    });
    console.log("----------------------");
    console.log(data, error);
  });
  // if (error ) {
  //   return res.status(400).json({ error });
  // }
  res.status(200).json("email sent sucess resend");
});
// re_aWVbMUS9_2t9FvqEGLz7DPbHPraJ4pwT5
// re_DT58EC84_KB3QYQxhu3eBuZMP31NBhYx4

app.get("/pdf", (req, res) => {
  console.log("serve pdf, works");
  const email = req.query.email;
  console.log(req.query);
  const pdfPath = path.join(__dirname, "public", "pdfs", `${email}.pdf`);
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
