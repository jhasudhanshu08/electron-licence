const express = require("express");
const path = require("path");
const app = express();
const plant = require("./controllers/plant.controller");
require("./models/db");

app.use(express.json());
app.use(express.urlencoded({ limit: "16mb", extended: true, parameterLimit: 50000 }));

app.use("/api", plant, (req, res) => {
    res.sendFile(path.join(__dirname, '/gate.html'))
});




app.listen(3000, () => {
    console.log("Listen on port 3000 !!");
})