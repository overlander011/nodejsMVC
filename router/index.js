module.exports = function (app) {
    var request = require('../controller/request')

    
    

    //Get studentbyID
    app.post('/getPatientList',async(req, res) =>{
        var result = (await new request().getAll_PatientList(req.body))
        res.status(200)
        res.json(result)
    })

     //Get studentbyID
     app.get('/getTotal_PatientsInHospital',async(req, res) =>{
        var result = (await new request().getTotal_PatientsInHospital(req.body))
        res.status(200)
        res.json(result)
    })

    //Get studentbyID
    app.get('/ShowDataPatient',async(req, res) =>{
    var result = (await new request().getDataPatient(req.body))
    res.status(200)
    res.json(result)
})

   
}
