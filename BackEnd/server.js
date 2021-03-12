
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

var UserSchema = new Schema({
  fname: String,
  sname: String,
  email: String,
  password: String
});

var User = mongoose.model("registerDetails", UserSchema);

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
  check('fname')
    .notEmpty()
    .withMessage("First name is required."),
  //sname cannot be empty
  check('sname')
    .notEmpty()
    .withMessage("Surname is required."),
  //email must be an email
  check('email')
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email address"),
  //password mujst be 5 characters
  check('password')
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("PAssword must be more than 5 characters long"),
  (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("text field is empty");
      return res.status(422).json({ errors: errors.array() });
    }

    User.findOne({ email: req.body.email }, function (err, users) {
      if (err) console.log(err);
      // object of all the users
      console.log(users)
      if (users) {
        res.status(408).send();
        console.log("USer exists");
      }
      else {
        console.log(req.body.fname);
        console.log(req.body.sname);
        console.log(req.body.email);
        console.log(req.body.password);

        User.create({
          fname: req.body.fname,
          sname: req.body.sname,
          email: req.body.email,
          password: req.body.password
        })
        res.send("User Registration Successfull");
      }

    }
    )
  }
)