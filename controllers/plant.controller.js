const express = require("express");
const router = express.Router();
const PlantService = require("../services/plant.service");
const Plant = require("../models/plant.model");

exports.check = async(req, res) => {
        console.log(req.body);
        console.log(req.params);
        console.log(req.query);

        Plant({
            plantId: req.body.key
        })
        console.log("aaaaaaaaaaaaaaa", Plant)

        PlantService.checkDataService(Plant)

        .then((response)=>{
            console.log(response)
            if(!response.status){
                throw new Error(response.message); 
            }     
            res.status(200).json({
                message: true,
                response: response.response
            })
        })
        .catch((err)=>{
            console.log(err);
            res.status(401).json({
                status: false,
                message: err.message
            });
        });
    
}

// module.exports = router;