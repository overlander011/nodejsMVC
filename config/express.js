var express = require('express')
var bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require(`../view/swagger.json`);
var cors  = require('cors')
module.exports = function()
{
    var app = express()
    app.use(cors( {origin: '*'} ))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.text())
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    require('../router/index.js')(app)
    return app
}
