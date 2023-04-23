const express = require("express");
const filesRoutes = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const dataPath = "./db/files.json"; // path to our JSON file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./db/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});
const upload = multer({ storage });

const getFileData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// uploading big data(files, documents, images)
filesRoutes.post("/upload", upload.single("file"), (req, res) => {
  // save file details to JSON database and return the URL to the client
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

  // creating absolutely unique ID
  let fileId,
    files = getFileData(),
    flag = true;
  while (true) {
    fileId = Math.floor(100000 + Math.random() * 900000); // choosing it with math random
    for (let i = 0; i < files.length; i++) {
      if (files[i].id == fileId) {
        flag = false;
        break;
      }
    }
    if (flag) break;
    flag = true;
  }

  const file = {
    id: fileId,
    filename: req.file.originalname,
    url: fileUrl,
  };

  let data = getFileData();
  data.push(file); // adding file
  data = JSON.stringify(data);

  // writing changes
  fs.writeFile(dataPath, data, (err) => {
    if (err) throw err;
    console.log("New data added");
  });

  res.json({ url: fileUrl });
});

// getting lists] of files for table
filesRoutes.get("/upload/list", (req, res) => {
  const files = getFileData();
  res.send(files);
});

filesRoutes.get("/upload/:id", async (req, res) => {
  let files = getFileData();

  //finding file by ID or primary key
  const fileId = req.params["id"];
  let file;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
    if (files[i].id == fileId) {
      file = files[i];
      break;
    }
  }

  if (!file) {
    return res.status(404).send("File not found");
  }

  try {
    res.sendFile(__dirname + `/db/uploads/${file.filename}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error downloading file");
  }
});

module.exports = filesRoutes;
