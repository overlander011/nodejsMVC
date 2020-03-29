var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const roomdb = new Schema ({
    RID :{type: String,unique:true},
    Firstname: String,
    Lastname: String,
    Status :  String
});

var roomData = [{
    "RID": "001",
    "Firstname": "อิสรภาพ",
    "Lastname" :"นวดโอโล",
    "Status": "Ready"
},{
    "RID": "002",
    "Firstname": "บิลเกต",
    "Lastname" :"คอมเทพ",
    "Status": "Ready"
},{
    "RID": "003",
    "Firstname": "หนุมาน",
    "Lastname" :"ชาญสมอญ",
    "Status": "Pending"
},{
    "RID": "004",
    "Firstname": "คุโรซากิ",
    "Lastname" :"อิจิโกะ",
    "Status": "NotReady"
},{
    "RID": "005",
    "Firstname": "เก็นจิ",
    "Lastname" :"ทาคิยะ",
    "Status": "NotReady"
},
]

// สร้าง database schema 
module.exports=mongoose.model('Rooms',roomdb)


module.exports.collection.insert(roomData)