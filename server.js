var express = require('./config/express')
var app = express()
var mongoose = require('./config/mongoose')

var db = mongoose();

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.info('[Server] http://localhost:'+port)
  console.info('[Swagger] http://localhost:'+port+'/api-docs/')
})
