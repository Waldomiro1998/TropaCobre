const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userID:{type: Number,require:true ,unique:true},
    playerID: {type: Number,require:true ,unique:true},
})

const model = mongoose.model("UserModels",userSchema)

module.exports = model