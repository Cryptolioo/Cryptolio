const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

// Use cors to read JSON data from the Node/Express server
// This code will avoid a CORS error
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-control-Allow-Origin", "*")
    res.header("Access-control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const myConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/cryptos?retryWrites=true&w=majority'
var conn = mongoose.createConnection(myConnectionString)

const Schema = mongoose.Schema

var cryptoSchema = new Schema({
  ticker: String,
  holdings: String
})

var CryptoModel = conn.model('tests', cryptoSchema)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/cryptos', (req, res) => {
  CryptoModel.find((err, data) => {
    res.json(data);
  })
})

app.post('/api/cryptos', (req, res) => {
  console.log("Crypto Received!");
  console.log(req.body.ticker);
  console.log(req.body.holdings);

  CryptoModel.create({
    ticker:req.body.ticker,
    holdings:req.body.holdings
  })

  res.send('Crypto Added');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})