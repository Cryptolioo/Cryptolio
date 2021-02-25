const express = require('express')
const app = express()
const port = 4000

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
  res.json({cryptos:mycryptos})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})