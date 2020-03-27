var mongoose = require('mongoose');
var Schema = mongoose.Schema;



const coursedb = new Schema ({
    CourseID: {type: String,unique:true},
    CourseName_Th: String,
    CourseName_Eng: String,
    Type: String,
    Faculty : {
        FacultyID: String
    }
    
});




// สร้าง database schema 
module.exports=mongoose.model('Course',coursedb)