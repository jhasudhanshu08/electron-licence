const express = require("express");
// const path = require("path");
// const fs = require("fs");
const remote = require("./controllers/plant.controller");

// const router = express.Router();
const app = express();
const plantController = require("./controllers/plant.controller");
require("./models/db");

app.use(express.json());
app.use(express.urlencoded({ limit: "16mb", extended: true, parameterLimit: 50000 }));

// app.use("/api", plantController.check);
// const one = async () => {
//     remote.check;
// }

// app.use(remote.check());
// one();
remote.check(req, res)


app.listen(3000, () => {
    console.log("Listen on port 3000 !!");
})