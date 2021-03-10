
const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator')
const mongoose = require('mongoose');

//PARSE APPLICATION /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//add mongo connection String here
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/register?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;

var cryptolioSchema = new Schema({
  fname: String,
  sname: String,
  email: String,
  password: String
});

var cryptolioModel = mongoose.model("registerDetails", cryptolioSchema);

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

app.post('/register',
  //fname cannot be empty
  check('fname', 'Firt name is required.')
    .notEmpty(),
  //.withMessage("Firt name is required."),
  //sname cannot be empty
  check('sname', 'Surname cannot be empty.')
    .notEmpty(),
  // .withMessage("Text field cannot be empty."),
  //email must be an email
  check('email')
    .notEmpty()
    .isEmail()
    .withMessage({ message: "Invalid Email address", errorCode: 2 }),
  //password mujst be 5 characters
  check('password')
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage({ message: "Password must be more than 5 charcaters long", errorCode: 3 }),
  (req, res) => {
    //finds validation erros in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("text field is empty");
      return res.status(422).json({ errors: errors.array() });
    }
    console.log("User created");
    console.log(req.body.fname);
    console.log(req.body.sname);
    console.log(req.body.email);
    console.log(req.body.password);

    cryptolioModel.create({
      fname: req.body.fname,
      sname: req.body.sname,
      email: req.body.email,
      password: req.body.password
    })
    console.log("Successfull")
  }
)




