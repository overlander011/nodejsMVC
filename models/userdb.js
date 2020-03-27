var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const faculty = new Schema ({
    FacultyID: {type: String,unique:true},
    FacultyName_Th: String,
    FacultyName_Eng: String,
});

const course = new Schema ({
    CourseID: {type: String,unique:true},
    CourseName_Th: String,
    CourseName_Eng: String,
    Type: String,
    Faculty : faculty,
    
});

const userdb = new Schema ({
    StudentID :{type: String,unique:true},
    Firstname_Th: String,
    Firstname_Eng: String,
    Lastname_Th: String,
    Lastname_Eng : String,
    Course : [course],
});


// สร้าง database schema 
module.exports=mongoose.model('User',userdb)