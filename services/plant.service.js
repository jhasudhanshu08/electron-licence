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
            const obj = JSON.stringify({
                key: "Licence not matched !!",
                status: false

            })

            fs.writeFileSync("licence.json", obj, (err) => {
                console.log("xxxxxxxx")
                if (err) {
                  console.log("error");
                }
              });
              let obj1 = JSON.parse(obj)
              response.status = false;
              response.response = obj1.key;
              console.log("///////////////", response)


            throw new Error ("PLant Id is not found !!")
        }
        else {
            console.log("else .....")
        

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