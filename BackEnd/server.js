const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const { body, validationResult, check } = require('express-validator');

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

const myLogoConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/cryptologos?retryWrites=true&w=majority'
var conn2 = mongoose.createConnection(myLogoConnectionString)

const Schema = mongoose.Schema

var cryptoSchema = new Schema({
  ticker: String,
  name: String,
  holdings: String,
  logo: String
})

var logoSchema = new Schema({
  ticker: String,
  name: String,
  logo: String
})

var CryptoModel = conn.model('tests', cryptoSchema)
var LogoModel = conn2.model('logos', logoSchema)

app.get('/api/cryptos', (req, res) => {
  CryptoModel.find((err, data) => {
    res.json(data)
  })
})

app.get('/api/cryptos/:id', (req,res) => {
  CryptoModel.findById(req.params.id, (err,data) => {
    res.json(data)
  })
})

app.put('/api/cryptos/:id', (req, res) => {
    CryptoModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
      (err) => {
        if (err) console.log(err)
      })
      res.sendStatus(200)
  })

app.delete('/api/cryptos/:id', (req, res) => {
  CryptoModel.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) {
          console.log(err)
      }
      res.send(data)
  })
})

app.post('/api/cryptos',
  check('holdings').isFloat({ min: 0 }),
  (req, res) => {
    LogoModel.findOne({ 'ticker': req.body.ticker }, (err, result) => {
      if (err) {
        console.log(err)
      }
      else if (result == null) {
          res.sendStatus(402)
      }
      else {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
          res.sendStatus(404)
        }
        else {
          CryptoModel.create({
            ticker:req.body.ticker,
            name: result.name,
            holdings:req.body.holdings,
            logo: result.logo,
          })
          res.sendStatus(200)
        }
      }
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})