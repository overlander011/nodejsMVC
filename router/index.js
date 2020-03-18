module.exports = function (app) {
    var request = require('../controller/payment')

    
    //Register
    app.post('/register',async(req, res) =>{
            var result = (await new request().register(req.body))
            res.status(201)
            res.json(result)
    })

    //Login
    app.post('/login',async(req, res) =>{
            var result = (await new request().login(req.body))
            res.status(200)
            res.json(result)
    })

    //Get information
    app.get('/getInformation',async(req, res) =>{
        var result = (await new request().getInformation(req.body))
        res.status(200)
        res.json(result)
    })

    //save history 
    app.post('/addHistory',async(req, res) =>{
        var result = (await new request().addhistory(req.body))
        res.status(200)
        res.json(result)
    })

    //Edit information
    app.post('/editInformation',async(req, res) =>{
        var result = (await new request().editInformation(req.body))
        res.status(200)
        res.json(result)
    })

    //sending newPass to email 
    app.post('/forgetPassword',async(req, res) =>{
        var result = (await new request().sendPassword(req.body))
        res.status(200)
        res.json(result)
    })

    //Delete information
    app.get('/deleteinformation',async(req, res) =>{
        var result = (await new request().deleteInformation(req.body))
        res.status(200)
        res.json(result)
    })
}
