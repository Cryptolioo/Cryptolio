
const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000

const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

//PARSE APPLICATION /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//add mongo connection String here
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/register?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

var RegisterSchema = new Schema({
  fname: String,
  sname: String,
  email: String,
  password: String,
  resetToken: String,
  expireToken: String
});

var User = mongoose.model("registerDetails", RegisterSchema);




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
    .isLength({ min: 5, max: 9 })
    .withMessage("PAssword must be more than 5 characters long"),
  (req, res) => {

    const errors = validationResult(req);




    app.post('/api/login',
      // //email must be an email
      // check('email').isEmail(),
      // //password mujst be 5 characters
      // check('password').isLength({ min: 5 }),
      (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
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
            bcrypt.hash(req.body.password, 10).then((hash) => {
              try {
                console.log(req.body.fname);
                console.log(req.body.sname);
                console.log(req.body.email);
                console.log(hash);

                User.create({
                  fname: req.body.fname,
                  sname: req.body.sname,
                  email: req.body.email,
                  password: hash
                })
                res.send("User Registration Successfull");

              } catch (e) {
                res.status(500).send(e);
              }
            });


          }

        }
        )
      }
    )
    

    User.findOne({ email: req.body.email }, function (err, users) {
      if (err) console.log(err);

      if (users) {
        console.log("User exists");

        const validPassword = bcrypt.compare(req.body.password, users.password);
        if (validPassword) {
          console.log("Valid email and password");
        }
        else {
          console.log("Invalid password")
        }
      }

      else {
        console.log("Email does not exist.")
      }
    })
  })








app.post('/api/forgotPassword', (req, res) => {

  crypto.randomBytes(32, (err, data) => {
    if (err) {
      console.log(err);
    }

    const token = data.toString("hex");
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({ error: "User with that email does not exist" })
        }
        console.log("User found")
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "no-reply@cryptolio.com",
            subject: "Password reset",
            html: `
            <p>You requested password reset</p>
            <h5>click this <a href="http://localhost:3000/reset/${token}">link </a> for password reset</h5>
            `
          })
          res.json({ message: "Check your email" })
        })
      })
      .catch(err => {
        console.log(err);
      })
  })
})

