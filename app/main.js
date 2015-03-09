var express = require('express')
  , app = express()

app.use(express.static(__dirname + '/../public'))

app.get('/', function (req, res) {
  res.send('Привет, Мир!')
})

module.exports = app