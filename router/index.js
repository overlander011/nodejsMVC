module.exports = function (app) {
    var request = require('../controller/request')

    
    

    //Get studentbyID
    app.post('/createNewRooms',async(req, res) =>{
        var result = (await new request().createNewRooms(req.body))
        res.status(200)
        res.json(result)
    })

    //Edit Rooms
    app.post('/editRooms',async(req, res) =>{
        var result = (await new request().editRooms(req.body))
        res.status(200)
        res.json(result)
    })

    
    //get Report data
    app.get('/getReportData',async(req, res) =>{
        var result = (await new request().getReportData(req.body))
        res.status(200)
        res.json(result)
    })

   
}
