var mongoose = require('mongoose')
const url ='mongodb+srv://itsaraphap:lasarpoy@cluster0-p3h0p.mongodb.net/test';

module.exports =  function () {
    mongoose.set('debug :', true);
    console.log('mongoUri :'+url);
    var db = mongoose.connect(url,
        { useNewUrlParser : true}
    );

    require('../models/patientdb');
    require('../models/hospitaldb');
    require('../models/patientStatusdb');
   
    return db

}