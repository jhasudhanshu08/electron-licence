const express = require("express");
const router = express.Router();
const Plant = require("../services/plant.service");

router.use("/check", checkData = async(req, res) => {
        console.log(req.body);
        console.log(req.params);
        console.log(req.query);

        Plant.checkDataService(req.body.plantId)

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
    
})

module.exports = router;