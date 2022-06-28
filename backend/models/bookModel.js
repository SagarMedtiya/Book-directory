const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    
    title:{
        type: String,
        required: true
    },
    image: { type: String, required:false, get:(image)=>{
        return `${process.env.APP_URL}/${image}`;
    }},
    authors:{
        type: Array,
        required: false
    },
    dateOfPublication:{
        type:Date,
        required: false
    },
    chapters:{
        type:Array,
        required: false,
    },
    price:{
        type:Number,
        required: false
    }


},{timestamps:true, toJSON:{ getters:true }, id:false});



const BookDB = mongoose.model('bookdb', schema);
module.exports = BookDB;