const mongoose = require("mongoose");

var plantSchema = new mongoose.Schema({
    plantId: String,
    status: Boolean
})

module.exports = mongoose.model("Plant", plantSchema);