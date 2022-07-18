const express = require("express");
const path = require("path");
const fs = require("fs");

// const router = express.Router();
const app = express();
const plantController = require("./controllers/plant.controller");
require("./models/db");

app.use(express.json());
app.use(express.urlencoded({ limit: "16mb", extended: true, parameterLimit: 50000 }));

app.use("/api", (req, res) => {
    res.send(plantController.check);
});

function test (x){
    
    console.log(x)
    setTimeout(one, 5000);
    function one() {
    let data = fs.readFileSync("./licence.txt", "utf-8");
    console.log("readfile", data);
    }

    fs.writeFileSync("licence.txt", 'true', (err) => {
        console.log("xxxxxxxx")
        if (err) {
          console.log("error");
        }
      });
}

test(30)
app.listen(3000, () => {
    console.log("Listen on port 3000 !!");
})