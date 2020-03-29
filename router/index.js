module.exports = function (app) {
    var request = require('../controller/request')

    
    

    //Get studentbyID
    app.post('/loginWithEmail',async(req, res) =>{
        var result = (await new request().loginWithEmail(req.body))
        res.status(200)
        res.json(result)
    })

    app.get('/getAll_Login',async(req, res) =>{
        var result = (await new request().getAll_Login(req.body))
        res.status(200)
        res.json(result)
    })

    app.get('/getAll_notLogin',async(req, res) =>{
        var result = (await new request().getAll_notLogin(req.body))
        res.status(200)
        res.json(result)
    })

    app.get('/getAllData',async(req, res) =>{
        var result = (await new request().getAllData(req.body))
        res.status(200)
        res.json(result)
    })

   
}
