const http = require("http");
const express = require("express");
const uploadMiddleware = require("./uploadMiddleware");
const xlsx = require("xlsx");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server listening on port 3000");
});

app.post("/upload", uploadMiddleware.single("file"), async (req, res) => {
  // Save the file to the database or do something else with it.
  // The uploaded file will be available in the `req.file` object.
  const file = req.file;
  const workbook = await xlsx.readFile(file.path);
  const sheets = workbook.SheetNames;
  let sheetData = [];
  console.log(sheets);
  for (let i = 0; i < sheets.length; i++) {
    let data = [];
    let sheetName = sheets[i];
    const temp = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    temp.forEach((res) => {
      data.push(res);
    });
    let obj = {};
    obj[sheetName] = data;
    sheetData.push(obj);
  }

  // Send the data back to the client.
  res.json(sheetData);
});
