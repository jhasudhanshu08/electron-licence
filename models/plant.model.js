const mongoose = require("mongoose");

var plantSchema = new mongoose.Schema({
    plantId: String
})

module.exports = mongoose.model("Plant", plantSchema);