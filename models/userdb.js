var mongoose = require('mongoose');
var Schema = mongoose.Schema;



const userdb = new Schema ({
    StudentID :{type: String,unique:true},
    Firstname_Th: String,
    Firstname_Eng: String,
    Lastname_Th: String,
    Lastname_Eng : String,
    Course :  {
        CourseID: String
    }
});


// สร้าง database schema 
module.exports=mongoose.model('User',userdb)