
const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator')

//PARSE APPLICATION /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// app.post('/register' , (req,res) => {
//   //for database--not added yet
//  // register.create({
//     fname: req.body.fname,
//     sname: req.body.sname,
//     email: req.body.email,
//     password: req.body.password,
//   }).then(register => res.json(user));
// })

app.post('/api/register',
  //fname cannot be empty
  check('fname').not().isEmpty(),
  //sname cannot be empty
  check('sname').not().isEmpty(),
  //email must be an email
  check('email').isEmail(),
  //password mujst be 5 characters
  check('password').isLength({ min: 5 }),
  (req, res) => {
    //finds validation erros in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("SOmething");
      return res.status(400).json({ errors: errors.array() });
  
    }
    console.log("User created");
    console.log(req.body.fname);
    console.log(req.body.sname);
    console.log(req.body.email);
    console.log(req.body.password);
  }
)

