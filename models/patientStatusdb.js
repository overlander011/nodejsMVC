var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const patientStatusdb = new Schema ({
    HNID: {type: String,unique:true},
    Covid_status: String,
    
});

var patientStatusData = [{
    "HNID": "01",
    "Covid_status": "Positive"
    
},{
    "HNID": "02",
    "Covid_status": "Positive"

},{
    "HNID": "03",
    "Covid_status": "Positive"
},{
    "HNID": "04",
    "Covid_status": "Positive"
},{
    "HNID": "05",
    "Covid_status": "Positive"
},{
    "HNID": "06",
    "Covid_status": "Positive"
}]

// สร้าง database schema 
module.exports=mongoose.model('PatientStatus',patientStatusdb)
module.exports.collection.insert(patientStatusData)