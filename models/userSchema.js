const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userID:{type: String,require:true ,unique:true},
    playerID: {type: String,require:true ,unique:true},
})

const model = mongoose.model("UserModels",userSchema)

module.exports = model