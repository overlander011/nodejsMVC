var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const hospitaldb = new Schema ({
    HID :{type: String,unique:true},
    Title :  String
});

var hospitalData = [{
    "HID": "001",
    "Title": "jurarat1",
    
},{
    "HID": "002",
    "Title": "jurarat2",
    
},{
    "HID": "003",
    "Title": "jurarat3",
    
}]

// สร้าง database schema 
module.exports=mongoose.model('Hospital',hospitaldb)
module.exports.collection.insert(hospitalData)