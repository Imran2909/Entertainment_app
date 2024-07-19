const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{type:String},
    password:{type:String},
    bookmark:{type:Array}
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel
