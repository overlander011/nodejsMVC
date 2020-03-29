var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const studentdb = new Schema ({
    SID :{type: String,unique:true},
    Password: String,
    Firstname: String,
    Lastname: String,
    Status :  String
});

var studentData = [{
    "SID": "60050284",
    "Firstname": "อิสรภาพ",
    "Lastname" :"นวดโอโล",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050270",
    "Firstname": "กกกกกก",
    "Lastname" :"กกกกก",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050271",
    "Firstname": "ฟฟฟฟฟ",
    "Lastname" :"ฟฟฟฟฟ",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050272",
    "Firstname": "อออออ",
    "Lastname" :"ออออออ",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050273",
    "Firstname": "ปปปปปป",
    "Lastname" :"ปปปปปปป",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050274",
    "Firstname": "สสสสสส",
    "Lastname" :"สสสสสสส",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050275",
    "Firstname": "รรรรรร",
    "Lastname" :"รรรรรร",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050276",
    "Firstname": "ยยยยยย",
    "Lastname" :"ยยยยยย",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050277",
    "Firstname": "ลลลลลล",
    "Lastname" :"ลลลลลลล",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050278",
    "Firstname": "ดดดดดดด",
    "Lastname" :"ดดดดดด",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
},{
    "SID": "60050279",
    "Firstname": "พพพพพพ",
    "Lastname" :"พพพพพพ",
    "Password": "123456",
    "Status": "ยังไม่เข้าสู่ระบบ"
}
]

// สร้าง database schema 
module.exports=mongoose.model('Student',studentdb)


module.exports.collection.insert(studentData)