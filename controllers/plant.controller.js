const express = require("express");
const router = express.Router();
const PlantService = require("../services/plant.service");
const Plant = require("../models/plant.model");
const fs = require("fs");


exports.check = async() => {
        // console.log("body", req.body);
        // console.log("params", req.params);
        // console.log("query", req.query);
        console.log("---------------");
        

        let data = fs.readFileSync("./licence.json", "utf-8");
        console.log("++++++++++++", data);
        let result = JSON.parse(data);

        PlantService.checkDataService(result.key)
        .then((response)=>{
            console.log("response++++++", response)
            if(!response.status){
                throw new Error(response.message); 
            }     
            // res.status(200).json({
            //     message: true,
            //     response: response.response
            // })
        })
        .catch((err)=>{
            console.log(err);
            // res.status(401).json({
            //     status: false,
            //     message: err.message
            // });
        });
    
}
