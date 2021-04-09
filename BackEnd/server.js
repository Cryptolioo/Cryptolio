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
app.use(function(req, res, next) {
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

// Register
app.post('/register',
    check('fname').notEmpty().withMessage("First name is required."),//fname cannot be empty
    check('sname').notEmpty().withMessage("Surname is required."),//sname cannot be empty
    check('email').notEmpty().isEmail().withMessage("Invalid email address"),//email must be an email
    check('password').notEmpty().isLength({ min: 5 }).withMessage("Password must be more than 5 characters long"),//password must be 5 characters
    (req, res) => {
        const errors = validationResult(req);

        User.findOne({ email: req.body.email }, function(err, users) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            if (users) {
                res.status(408).send();
                console.log("User exists");
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        try {
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
                                            href="http://localhost:3000/"</<h5>`
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            res.sendStatus(200);
                        } catch (e) {
                            res.status(500).send(e);
                        }
                    });
            }
        })
    })



app.post('/api/login',
    check('email').isEmail().withMessage('Please enter a valid email address'), //email must be an email
    check('password').isLength({ min: 5 }).withMessage('Password must be more than 5 characters long'), //password must be 5 characters
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }

        User.findOne({ email: req.body.email }, function(err, users) {
            if (err) console.log(err);

            if (users) {
                console.log("User exists");
                bcrypt.compare(req.body.password, users.password)
                .then((response) => {
                    if(response == true)
                    {
                        console.log("Valid email and password");
                        let id = users._id.toString();
                        res.status(200).json({
                            token: 1,
                            userID: id
                        })
                    }
                    else {
                        console.log("Invalid password")
                        res.sendStatus(401)
                    }
                })
                .catch((err) => {console.log(err)});
            } else {
                console.log("Email does not exist.")
                res.sendStatus(402)
            }
        })
    })


app.post('/api/forgot-password', (req, res) => {
    crypto.randomBytes(32, (err, data) => {
        if (err) console.log(err);
        const token = data.toString("hex");

        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    res.status(422).json({ error: "User with that email does not exist" })
                }
                console.log("User found")
                user.resetToken = token;
                user.expireToken = Date.now() + 3600000;

                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "g00376678@gmit.ie",
                        subject: "Password reset",
                        html: `<p>You requested password reset</p>
                            <h5>Click this <a href="http://localhost:3000/reset-password/${token}">
                            link </a> for password reset</h5>`
                    })
                    res.sendStatus(200)
                })
            })
            .catch(err => {
                console.log(err);
            })
    })
})

app.get('/api/reset-password/:token', (req, res) => {
    console.log(req.params.token)
    User.findOne({resetToken:req.params.token, expireToken:{$gt:Date.now()}}, (err, user) => {
        if(err) {
            console.log(err)
        }
        else if(!user) {
            res.status(422).json({error:"Session has expired. Please try again"})
        }
        else {
            console.log(user)
            res.sendStatus(200)
        }
    })
})

// Portfolio
app.get('/api/cryptos/:id', (req, res) => {
    CryptoModel = conn.model(req.params.id, cryptoSchema)

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

// Return details of crypto specified
app.get('/api/cryptos/', (req, res) => {
    CryptoModel = conn.model(req.query.userID, cryptoSchema)
    CryptoModel.findById(req.query.id, (err, data) => {
        res.json(data)
    })
})

// Update crypto
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

// Delete crypto
app.delete('/api/cryptos/', (req, res) => {
    CryptoModel = conn.model(req.query.userID, cryptoSchema)
    CryptoModel.findByIdAndDelete(req.query.id, (err, data) => {
        if (err) console.log(err)
        res.send(data)
    })
})

// Add crypto
app.post('/api/cryptos',
    check('holdings').isFloat({ min: 0 }),
    (req, res) => {
        CryptoModel = conn.model(req.body.userID, cryptoSchema)

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
                            res.sendStatus(405)
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

// Contact Us
app.post('/api/contact-us', 
    check('email').isEmail(),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ error: "Please enter a valid email address" });
        }
        else {
            var email = {
                to: ["patrickmurray7878@gmail.com", "coryodonoghue1@gmail.com"],
                from: "g00376678@gmit.ie",
                subject: req.body.issue,
                text: req.body.details + " - " + req.body.email
            }
    
            transporter.sendMail(email, function(err, res) {
                if (err) {
                    console.log(err);
                }
            })

            var email = {
                to: req.body.email,
                from: "g00376678@gmit.ie",
                subject: "Support Ticket",
                text: "Your support ticket has been created. Expect a response within 24hrs"
            }

            transporter.sendMail(email, function(err, res) {
                if (err) {
                    console.log(err);
                }
            })
        }
})

app.get('/api/profile/:id', (req,res) => {User.findById(req.params.id, (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/api/profile', 
check('fname').notEmpty().withMessage('First name required'),
check('sname').notEmpty().withMessage('Surname required'),
check('email').isEmail().withMessage('Please enter a valid email address'),
(req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
    
    
    } else {
        User.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
            if(err) {
                console.log(err)
            }
            else {
                res.sendStatus(200)
            }
        })
    }
})

app.post('/api/check-password', (req, res) => {
    User.findById(req.body.id, (err, data) => {
        bcrypt.compare(req.body.password, data.password)
            .then((response) => {
                if(response == true)
                {
                    res.sendStatus(200)
                }
                else {
                    res.sendStatus(401)
                }
            })
            .catch((err) => {console.log(err)});
    })
})

app.post('/api/change-password', 
check('newPassword').notEmpty().isLength({ min: 5 }),
(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ error: "Password must be more than 5 characters long" });
    }
    else {
        if(req.body.token != null) {
            User.findOne({resetToken:req.body.token, expireToken:{$gt:Date.now()}})
            .then(user=>{
                if(!user){
                    res.status(414).json({error:"Try again session expired"})
                }
                bcrypt.hash(req.body.newPassword,10).then(hash=>{
                    user.password = hash
                    user.resetToken = undefined
                    user.expireToken = undefined
                    user.save().then(()=>{
                        res.sendStatus(200)
                    })
                })
            })
        }
        else {
            bcrypt.hash(req.body.newPassword, 10)
            .then((hash) => {
                User.findByIdAndUpdate(req.body.id, {$set: { password: hash }}, (err, data) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        res.sendStatus(200);
                    }
                })
            }) 
        }
        
    }
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})