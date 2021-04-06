const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const CoinMarketCap = require('coinmarketcap-api')
const crypto = require('crypto');

const apiKey = 'f0dee9b3-a51d-44a4-90d6-630c961c7169'
const client = new CoinMarketCap(apiKey)

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

//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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}))

//add mongo connection String here
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/register?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const myCryptoConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/portfolios?retryWrites=true&w=majority'
var conn = mongoose.createConnection(myCryptoConnectionString)

const myLogoConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/cryptologos?retryWrites=true&w=majority'
var conn2 = mongoose.createConnection(myLogoConnectionString)

const Schema = mongoose.Schema
var userID;

var RegisterSchema = new Schema({
    fname: String,
    sname: String,
    email: String,
    password: String,
    resetToken: String,
    expireToken: String
});

var cryptoSchema = new Schema({
    ticker: String,
    name: String,
    price: String,
    holdings: String,
    logo: String
})

var logoSchema = new Schema({
    ticker: String,
    name: String,
    logo: String
})

var User = mongoose.model("registerDetails", RegisterSchema);
var CryptoModel;
var LogoModel = conn2.model('logos', logoSchema)

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
        .withMessage("Password must be more than 5 characters long"),
    (req, res) => {

        const errors = validationResult(req);

        User.findOne({ email: req.body.email }, function (err, users) {
            if (err) console.log(err);
            // object of all the users
            console.log(users)
            if (users) {
                res.status(408).send();
                console.log("USer exists");
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
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
                                .then(users => {
                                    transporter.sendMail({
                                        to: users.email,
                                        from: "g00376678@gmit.ie",
                                        subject: "Sign up successful",
                                        html: `<h1>Welcome to cryptolio!</h1>
                                                    <h5>Thank you for signing up! 
                                                    Come and get started here <a 
                                                    href="http://localhost:3000/" </<h5>`
                                    })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                })

                            res.send("User Registration Successfull");

                        } catch (e) {
                            res.status(500).send(e);
                        }
                    });
            }
        })
    })



app.post('/api/login',
    //email must be an email
    check('email').isEmail(),
    //password mujst be 5 characters
    check('password').isLength({ min: 5 }),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        User.findOne({ email: req.body.email }, function (err, users) {
            if (err) console.log(err);

            if (users) {
                console.log("User exists");

                const validPassword = bcrypt.compare(req.body.password, users.password);
                if (validPassword) {
                    console.log("Valid email and password");
                    // Stringify the id and use that as collection
                    let id = users._id.toString();
                    CryptoModel = conn.model(id, cryptoSchema);
                } else {
                    console.log("Invalid password")
                }
            } else {
                console.log("Email does not exist.")
            }
        })
    })

    
app.post('/api/profile', (req, res) => {
    //Check does current email match logged in email 
    //if true - update current email to newEmail.


    //if password matchs the password of logged in account
    //change current password to new password

    console.log("Hello")
    User.findOne({ email: req.body.currentEmail}) 
        .then(user=>{
            if (!user) {
                return res.status(422).json({ error: "User with that email does not exist" })
            }
            User.updateOne({
                email: req.body.newEmail
            })

        })
        .catch(err=>{
            console.log(err);
        }) 

     //     if(err)console.log(err);

    //     if (user) {
    //         User.updateOne({
    //             email: req.body.newEmail
    //         });
    //     }
    // })
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
                        from: "g00376678@gmit.ie",
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


// Portfolio
app.get('/api/cryptos', (req, res) => {
    CryptoModel.find((err, data) => {
        data.forEach(crypto => {
            client.getQuotes({ symbol: crypto.ticker, option: 'USD' })
                .then((res) => {
                    let ticker = "res.data." + crypto.ticker + ".quote.USD.price"
                    let tickerPrice = parseFloat(eval(ticker)).toFixed(3)
                    CryptoModel.findByIdAndUpdate(crypto.id, { price: tickerPrice },
                        (err, data) => {
                            if (err) console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        res.json(data)
    })
})

app.get('/api/cryptos/:id', (req, res) => {
    CryptoModel.findById(req.params.id, (err, data) => {
        res.json(data)
    })
})

app.put('/api/cryptos/:id',
    check('holdings').isFloat({ min: 0 }), // Check holdings is a valid value
    (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { // errors is not empty
            res.sendStatus(404)
        } else {
            req.body.holdings = parseFloat(req.body.holdings).toFixed(2)
            CryptoModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
                (err) => {
                    if (err) console.log(err)
                })
            res.sendStatus(200)
        }
    })

app.delete('/api/cryptos/:id', (req, res) => {
    CryptoModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) console.log(err)
        res.send(data)
    })
})

app.post('/api/cryptos',
    check('holdings').isFloat({ min: 0 }),
    (req, res) => {
        CryptoModel.findOne({ 'ticker': req.body.ticker }, (err, result) => {
            if (err) {
                console.log(err)
            } else if (result == null) {
                LogoModel.findOne({ 'ticker': req.body.ticker }, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else if (result == null) {
                        res.sendStatus(402)
                    } else {
                        var errors = validationResult(req)
                        if (!errors.isEmpty()) {
                            res.sendStatus(404)
                        } else {
                            client.getQuotes({ symbol: req.body.ticker, option: 'USD' })
                                .then((response) => {
                                    let ticker = "response.data." + req.body.ticker + ".quote.USD.price"
                                    let tickerPrice = parseFloat(eval(ticker)).toFixed(3)
                                    let holdings = parseFloat(req.body.holdings).toFixed(2)

                                    CryptoModel.create({
                                        ticker: req.body.ticker,
                                        name: result.name,
                                        price: tickerPrice,
                                        holdings: holdings,
                                        logo: result.logo,
                                    })

                                    res.sendStatus(200)
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    }
                })
            } else {
                let updatedHoldings = parseFloat(result.holdings) + parseFloat(req.body.holdings)
                updatedHoldings = parseFloat(updatedHoldings).toFixed(2)
                CryptoModel.findOneAndUpdate({ ticker: req.body.ticker }, { $set: { holdings: updatedHoldings } }, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.sendStatus(200) // Success
                    }
                })
            }
        })
    })


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})