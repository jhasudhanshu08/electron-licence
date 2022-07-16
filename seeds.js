const mongoose = require("mongoose");
const Plant = require("./models/plant.model");

mongoose.connect("mongodb://localhost:27017/electronkey", {
    // useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected !!")
}).catch(err => {
    console.log("Ohh no error ", err )
});

const seedDB = async() => {

    await Plant.deleteMany({});

    const plant1 = new Plant({
        plantId: "one"
    });
    const plant2 = new Plant({
        plantId: "two"
    });
    const plant3 = new Plant({
        plantId: "three"
    });
    const plant4 = new Plant({
        plantId: "four"
    });
    const plant5 = new Plant({
        plantId: "five"
    });
    const plant6 = new Plant({
        plantId: "six"
    });
    const plant7 = new Plant({
        plantId: "seven"
    });
    

    await plant1.save();
    await plant2.save();
    await plant3.save();
    await plant4.save();
    await plant5.save();
    await plant6.save();
    await plant7.save();
}

seedDB();

