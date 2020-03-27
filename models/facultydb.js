var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const facultydb = new Schema ({
    FacultyID: {type: String,unique:true},
    FacultyName_Th: String,
    FacultyName_Eng: String,
});


// สร้าง database schema 
module.exports=mongoose.model('Faculty',facultydb)