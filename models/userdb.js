var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const userdb = new Schema ({
    Username: {type: String, unique: true},
    Firstname: String,
    Lastname: String,
    Email: {type: String, unique: true},
    Password : String,
    Budget : {type: Intl},
    Used : {type: Intl},
    Expense_history : Array,
    Total : {type: Intl}

});



module.exports=mongoose.model('User',userdb)