const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator')

//PARSE APPLICATION /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-control-Allow-Origin", "*")
  res.header("Access-control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header("Access-control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


app.post('/api/login',
  //email must be an email
  check('email').isEmail(),
  //password mujst be 5 characters
  check('password').isLength({ min: 5 }),
  (req, res) => {
    // if (!errors.isEmpty()) {
    //   console.log("Something");
    //   return res.status(400).json({ errors: errors.array() });
    // }
    console.log("User Logged in");
    console.log(req.body.email);
    console.log(req.body.password);
  })

