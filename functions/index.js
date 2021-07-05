const functions = require("firebase-functions");
const admin = require("firebase-admin");
const json2csv = require("json2csv").parse;
const fs = require("fs");
const os = require("os");
const PdfPrinter = require("pdfmake/src/printer");
const axios = require("axios");

admin.initializeApp();

exports.subscribersCSV = functions.https.onRequest(async (request, response) => {
  var query = await admin
    .database()
    .ref("/subscribers")
    .orderByChild("addedOn")
    .once("value")
    .then((data) => data.val());
  const report = Object.entries(query).map((val) => val[1]);

  const csv = json2csv(report);
  response.setHeader("Content-disposition", "attachment; filename=report.csv");
  response.set("Content-Type", "text/csv");
  response.status(200).send(csv);
});

exports.contactCSV = functions.https.onRequest(async (request, response) => {
  var query = await admin
    .database()
    .ref("/contact-requests")
    .orderByChild("timestamp")
    .once("value")
    .then((data) => data.val());
  const report = Object.entries(query).map((val) => val[1]);

  const csv = json2csv(report);
  response.setHeader("Content-disposition", "attachment; filename=report.csv");
  response.set("Content-Type", "text/csv");
  response.status(200).send(csv);
});

exports.createpdf = functions.database.ref("/papers/{paperId}").onCreate(async (snap, context) => {
  try {
    const paperId = context.params.paperId;
    const val = snap.val();
    const { pages } = val;

    const storage = admin.storage();
    const bucket = storage.bucket();

    let images = new Array(pages.length);
    const pdfPath = `${os.tmpdir()}/${paperId}.pdf`;

    await Promise.all(
      pages.map(({ img }, i) =>
        axios.get(img, { responseType: "arraybuffer" }).then((res) => {
          images[i] = `data:${res.headers["content-type"]};base64,${Buffer.from(res.data).toString("base64")}`;
        })
      )
    );

    const docDefinition = {
      pageSize: { width: 600, height: 600 * 1.67 },
      pageOrientation: "potrait",
      content: images.map((img, i) => {
        return {
          image: img,
          fit: [600, 600 * 1.67],
          absolutePosition: { x: 0, y: 0 },
          pageBreak: i === images.length - 1 ? null : "after",
        };
      }),
    };

    const printer = new PdfPrinter();
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    pdfDoc.end();

    const pdfDest = `pdfs/${paperId}.pdf`;
    await bucket.upload(pdfPath, {
      destination: pdfDest,
    });

    const projectId = admin.app().options.projectId;
    const encodedPdfDest = encodeURIComponent(pdfDest);
    const pdfDownload = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/${encodedPdfDest}?alt=media`;

    return admin.database().ref(`/papers/${paperId}/pdfDownload`).set(pdfDownload);
  } catch (e) {
    console.log(e);
    return null;
  }
});
