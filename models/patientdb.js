var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const patientdb = new Schema ({
    HNID :{type: String,unique:true},
    Firstname: String,
    Lastname: String,
    HID :  String
});

var patientData = [{
    "HNID": "01",
    "Firstname": "a",
    "Lastname" :"aa",
    "HID": "001"
},{
    "HNID": "02",
    "Firstname": "b",
    "Lastname" :"bb",
    "HID": "002"
},{
    "HNID": "03",
    "Firstname": "c",
    "Lastname" :"cc",
    "HID": "002"
},{
    "HNID": "04",
    "Firstname": "d",
    "Lastname" :"dd",
    "HID": "003"
},{
    "HNID": "05",
    "Firstname": "e",
    "Lastname" :"ee",
    "HID": "003"
},{
    "HNID": "06",
    "Firstname": "f",
    "Lastname" :"ff",
    "HID": "003"
}]

// สร้าง database schema 
module.exports=mongoose.model('Patient',patientdb)


module.exports.collection.insert(patientData)