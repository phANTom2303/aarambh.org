const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        unique:true,
    },
    phoneNum:{
        type: String,
        required : true,
        unique: true,
    },
    dateOfJoin:{
        type: Date,
        required: true,
    },
    dateOfLeaving:{
        type: Date,
    }
    
}, 
{timestamps:true});

const Member = mongoose.model('member',memberSchema);

module.exports = Member;