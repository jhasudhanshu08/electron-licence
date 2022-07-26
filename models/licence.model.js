const mongoose = require("mongoose");

var licenceSchema = new mongoose.Schema({
    plantId: String,
    status: Boolean,
    id: false
})

module.exports = mongoose.model("Licence", licenceSchema);