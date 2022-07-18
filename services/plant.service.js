const Plant = require("../models/plant.model");

exports.checkDataService = async(plantId) => {


    // let newPlantId = new Plant({
    //     plantId: req.body.key
    // })

    // console.log("aaaaaaaaaaaaaaaaaa", newPlantId);

    try{
        let response = {
            status: false
        }

        const plant = await Plant.findOne({
            'plantId': plantId
        })
        console.log(plant);
        if(!plant) {
            throw new Error ("PLant Id is not match !!")
        }
        
        response.status = true;
        response.response = plantId;

    }
    catch(err){
        console.log(err);
        const response ={
            status: false,
            message: err.message
        }
        return response;
    }
}