const Plant = require("../models/plant.model");
const Licence = require("../models/licence.model");
const fs = require("fs");


exports.checkDataService = async(key) => {

    try{
        let response = {
            status: false
        }
        // console.log("testing........")
        const plant = await Plant.findOne({
            plantId: key
        })
        console.log("plant", plant);
        if(!plant) {
            // console.log("not plant")
            throw new Error ("PLant Id is not found !!")
        }
        else {
            console.log("else .....")
            // const licence = new Licence({
            //     plantId: plant.plantId,
            //     status: true
            // })
            // licence.save();

            const obj = JSON.stringify({
                key: plant.plantId,
                status: true

            })
            fs.writeFileSync("licence.json", obj, (err) => {
                console.log("xxxxxxxx")
                if (err) {
                  console.log("error");
                }
              });
              let obj1 = JSON.parse(obj)
              response.status = true;
              response.response = obj1.key;
              console.log("///////////////", response)
        }
        

        return response;


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