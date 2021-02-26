const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/cryptos', (req, res) => {
  const mycryptos = [
    {
      "Ticker": "BTC",
      "Price": "54000",
      "Holdings": "34"
    },
    {
      "Ticker": "ETH",
      "Price": "1700",
      "Holdings": "127"
    }
  ];
  console.log(mycryptos)
  res.json({mycryptos})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})