module.exports = function (app) {
    var request = require('../controller/request')

    
    //Create Student
    app.post('/createStudent',async(req, res) =>{
            var result = (await new request().CreateStudent(req.body))
            res.status(201)
            res.json(result)
    })

    //Get studentbyID
    app.post('/getStudentbyID',async(req, res) =>{
        var result = (await new request().getStudentbyID(req.body))
        res.status(200)
        res.json(result)
    })

  

   
}
