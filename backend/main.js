const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const port = 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route
const routes = require("./Routes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`NFACTORIAL app listening on port ${port}`);
});

// IDEALLY STRUCTURED CODE
