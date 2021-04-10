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

// API key for CoinMarketCap
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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}))

// Open connection to our users database
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/register?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Open connection to our cryptos database
const myCryptoConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/portfolios?retryWrites=true&w=majority'
var conn = mongoose.createConnection(myCryptoConnectionString)

// Open connection to our cryptologos database
const myLogoConnectionString = 'mongodb+srv://admin:admin@cluster0.3oxak.mongodb.net/cryptologos?retryWrites=true&w=majority'
var conn2 = mongoose.createConnection(myLogoConnectionString)

// Declare Schema and initialise it
const Schema = mongoose.Schema

// This is the registerSchema
var RegisterSchema = new Schema({
    fname: String,
    sname: String,
    email: String,
    password: String,
    resetToken: String,
    expireToken: String
});

// This is the cryptoSchema
var cryptoSchema = new Schema({
    ticker: String,
    name: String,
    price: String,
    holdings: String,
    logo: String
})

// This is the logoSchema
var logoSchema = new Schema({
    ticker: String,
    name: String,
    logo: String
})

// Create data model to represent the objects we have created
var User = mongoose.model("registerDetails", RegisterSchema);
var CryptoModel; // This model is updated regularly so it is dynamically set
var LogoModel = conn2.model('logos', logoSchema)

// Adds a new user to database if all details entered are valid
app.post('/register',
    check('fname').notEmpty().withMessage("First name is required."), // fname cannot be empty
    check('sname').notEmpty().withMessage("Surname is required."), // sname cannot be empty
    check('email').notEmpty().isEmail().withMessage("Invalid email address"), // email must be an email
    check('password').notEmpty().isLength({ min: 5 }).withMessage("Password must be more than 5 characters long"), // password must be 5 characters
    (req, res) => {
        const errors = validationResult(req);

        // Find a user with an email user entered
        User.findOne({ email: req.body.email }, function(err, users) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) { // Errors is not empty
                res.status(422).json({ errors: errors.array() }); // Return the errors to client
            }

            if (users) { // Email already in use
                res.status(408).send();
                console.log("User exists");
            } else { // Email is not in use
                bcrypt.hash(req.body.password, 10) // Hash the password entered by the user
                    .then((hash) => {
                        try { // Try to create user
                            User.create({
                                fname: req.body.fname,
                                sname: req.body.sname,
                                email: req.body.email,
                                password: hash
                            })
                            // After user is created send an email to their email confirming their account
                            // has been successfully created
                            .then(users => { 
                                transporter.sendMail({
                                    to: users.email,
                                    from: "no-reply@cryptolioo.com",
                                    subject: "Sign up successful",
                                    html: `<h1>Welcome to cryptolio!</h1>
                                            <h5>Thank you for signing up! 
                                            Come and get started <a 
                                            href="http://localhost:3000/">here </a></h5>`
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            res.sendStatus(200); // Success
                        } catch (e) {
                            res.status(500).send(e);
                        }
                    });
            }
        })
    })

// Logs the user in provided details entered are valid
app.post('/api/login',
    check('email').isEmail().withMessage('Please enter a valid email address'), // email must be an email
    check('password').isLength({ min: 5 }).withMessage('Password must be more than 5 characters long'), // password must be 5 characters
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) { // Errors is not empty
            res.status(422).json({ errors: errors.array() }); // Return errors to client
        }

        // Find a user with the email entered
        User.findOne({ email: req.body.email }, function(err, users) {
            if (err) console.log(err);

            if (users) { // User exists
                bcrypt.compare(req.body.password, users.password) // Compare the password entered with the one in the database
                .then((response) => {
                    if(response == true) // Password matches email
                    {
                        let id = users._id.toString(); // Stringify the users id and assign it to the variable id
                        res.status(200).json({ // Return a success status and a token and user id to client
                            token: 1,
                            userID: id
                        })
                    }
                    else { // Password did not match email
                        console.log("Invalid password")
                        res.sendStatus(401)
                    }
                })
                .catch((err) => {console.log(err)});
            } else { // Email is not in database
                console.log("Email does not exist.")
                res.sendStatus(402)
            }
        })
    })

// Sends an email to the email entered by the user if the email is valid so
// they can reset their password if it is forgotten
app.post('/api/forgot-password', (req, res) => {
    // Create a sequence of 32 random bytes to be used as a token
    crypto.randomBytes(32, (err, data) => {
        if (err) console.log(err);
        const token = data.toString("hex");

        // Finds a user from databse matching an email to req.body
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) { // Email doesnt exist in database
                    res.status(422).json({ error: "User with that email does not exist" })
                }
                // Found email in database
                // Give user a reset and expiry token
                user.resetToken = token;
                user.expireToken = Date.now() + 3600000; // Create an expiry token

                // Save user and send email to their email containing a link which contains the 
                // token which will bring them to the reset password page
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "no-reply@cryptolioo.com",
                        subject: "Password reset",
                        html: `<p>You requested password reset</p>
                            <h5>Click this <a href="http://localhost:3000/reset-password/${token}">
                            link </a> for password reset</h5>`
                    })
                    res.sendStatus(200) // Success
                })
            })
            .catch(err => {
                console.log(err);
            })
    })
})

// Ensure the token is valid and the expire token has not expired yet
app.get('/api/reset-password/:token', (req, res) => {
    // Find a user with a token which matches the token which was passed as a parameter and
    // an expire token which has not expired
    User.findOne({resetToken:req.params.token, expireToken:{$gt:Date.now()}}, (err, user) => {
        if(err) {
            console.log(err)
        }
        else if(!user) { // Expire token has expired
            res.status(422).json({error:"Session has expired. Please try again"})
        }
        else { // Token and expire token are valid
            res.sendStatus(200)
        }
    })
})

// Get data from the users portfolio database by using their id which is passed as
// a parameter
app.get('/api/cryptos/:id', (req, res) => {
    // Set CryptoModel with user id
    CryptoModel = conn.model(req.params.id, cryptoSchema)

    CryptoModel.find((err, data) => {
        data.forEach(crypto => { // For each crypto in database, get their current price in USD
            client.getQuotes({ symbol: crypto.ticker, option: 'USD' })
                .then((res) => {
                    let ticker = "res.data." + crypto.ticker + ".quote.USD.price"
                    let tickerPrice = parseFloat(eval(ticker)).toFixed(3) // Round to 3 decimel places
                    // Update the crypto with their updated price
                    CryptoModel.findByIdAndUpdate(crypto.id, { price: tickerPrice },
                        (err, data) => {
                            if (err) console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        // Get all the data in the database again with updated prices
        CryptoModel.find((err, data) => {
            if(err) console.log(err)
            res.json(data) // Return data to client
        })
    })
})

// Reads crypto by id from database and returns the crypto if id matched
// crypto from database
app.get('/api/cryptos/', (req, res) => {
    CryptoModel = conn.model(req.query.userID, cryptoSchema)
    CryptoModel.findById(req.query.id, (err, data) => {
        res.json(data) // Return data to client
    })
})

// Updates crypto in database by finding the cryptos ticker which matches id
app.put('/api/cryptos/:id',
    check('holdings').isFloat({ min: 0 }), // Check holdings is a valid value
    (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { // Errors is not empty
            res.sendStatus(404)
        } else { // Errors is empty
            req.body.holdings = parseFloat(req.body.holdings).toFixed(2) // Round to 2 decimel places
            // Update the crypto with their updated holdings
            CryptoModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
                (err) => {
                    if (err) console.log(err)
                })
            res.sendStatus(200) // Success
        }
})

// Finds crypto in database using the id and deletes it
app.delete('/api/cryptos/', (req, res) => {
    CryptoModel = conn.model(req.query.userID, cryptoSchema)
    CryptoModel.findByIdAndDelete(req.query.id, (err, data) => {
        if (err) console.log(err)
        res.send(data) 
    })
})

// Adds new crypto to database or updates existing one
app.post('/api/cryptos',
    check('holdings').isFloat({ min: 0 }), // Check holdings is a valid value
    (req, res) => {
        CryptoModel = conn.model(req.body.userID, cryptoSchema)
        // Try and find the ticker user entered in cryptos database
        CryptoModel.findOne({ 'ticker': req.body.ticker }, (err, result) => {
            if (err) {
                console.log(err)
            } else if (result == null) { // Crypto does not already exist
                // Try and find the ticker user entered in logos database
                LogoModel.findOne({ 'ticker': req.body.ticker }, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else if (result == null) { // Could not find ticker - Crypto not supported
                        res.sendStatus(402)
                    } else { // Found ticker
                        var errors = validationResult(req)
                        if (!errors.isEmpty()) { // Errors is not empty
                            res.sendStatus(405)
                        } else { // Errors is empty
                            // Get the cryptos current price in USD
                            client.getQuotes({ symbol: req.body.ticker, option: 'USD' })
                                .then((response) => {
                                    let ticker = "response.data." + req.body.ticker + ".quote.USD.price"
                                    let tickerPrice = parseFloat(eval(ticker)).toFixed(3)
                                    let holdings = parseFloat(req.body.holdings).toFixed(2)
                                    
                                    // Create new crypto
                                    CryptoModel.create({
                                        ticker: req.body.ticker, // Add the ticker user entered
                                        name: result.name, // Add full name from logo database
                                        price: tickerPrice, // Add the updated price rounded to 3 decimel places
                                        holdings: holdings, // Add the holdings which are rounded to 2 decimel places
                                        logo: result.logo, // Add logo from logo database
                                    })
                                    res.sendStatus(200) // Success
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    }
                })
            } else { // Crypto already exists so we need to update it
                let updatedHoldings = parseFloat(result.holdings) + parseFloat(req.body.holdings)
                updatedHoldings = parseFloat(updatedHoldings).toFixed(2) // Round the holdings to 2 decimel places
                // Find the crypto in database and set its holdings to the updated holdings
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

// Contacts support by sending them an email containing the data entered
// by the user provided the data is valid
app.post('/api/contact-us', 
    check('email').isEmail(), // Email must be valid
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) { // Errors is not empty
            res.status(422).json({ error: "Please enter a valid email address" });
        }
        else { // Data is valid
            // Create email to send to support
            var email = {
                to: ["patrickmurray7878@gmail.com", "coryodonoghue1@gmail.com"],
                from: "no-reply@cryptolioo.com",
                subject: req.body.issue,
                text: req.body.details + " - " + req.body.email
            }
            
            // Send email
            transporter.sendMail(email, function(err, res) {
                if (err) {
                    console.log(err);
                }
            })

            // Create email to send to user
            var email = {
                to: req.body.email,
                from: "no-reply@cryptolioo.com",
                subject: "Support Ticket",
                text: "Your support ticket has been created. Expect a response within 24hrs"
            }

            // Send email
            transporter.sendMail(email, function(err, res) {
                if (err) {
                    console.log(err);
                }
            })
        }
})

// Get users data by using their id which is passed as a parameter to search the database
app.get('/api/profile/:id', (req,res) => {
    User.findById(req.params.id, (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            res.status(200).send(data) // Send users data to client
        }
    })
})

// Update the users details provided the details entered are valid
app.post('/api/profile', 
check('fname').notEmpty().withMessage('First name required'),
check('sname').notEmpty().withMessage('Surname required'),
check('email').isEmail().withMessage('Please enter a valid email address'),
(req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) { // Errors not empty
        res.status(422).json({ errors: errors.array() }); // Return errors to client
    } else { // Errors is empty
        // Find user by their id and update their credentials
        User.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
            if(err) {
                console.log(err)
            }
            else {
                res.sendStatus(200) // Success
            }
        })
    }
})

// Check the password user entered is the password which
// matches the account
app.post('/api/check-password', (req, res) => {
    // Find user by id which is passed in the body of the request
    User.findById(req.body.id, (err, data) => {
        bcrypt.compare(req.body.password, data.password) // Compare the password user entered with password for the account
            .then((response) => {
                if(response == true) // Password matches
                {
                    res.sendStatus(200) // Success
                }
                else { // Password doesn't match
                    res.sendStatus(401)
                }
            })
            .catch((err) => {console.log(err)});
    })
})

// Change the users password provided details entered are correct
app.post('/api/change-password', 
check('newPassword').notEmpty().isLength({ min: 5 }), // Password must be 5 chracters minimum
(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) { // Errors is not empty
        res.status(422).json({ error: "Password must be more than 5 characters long" });
    }
    else { // Errors is empty
        if(req.body.token != null) { // User is resetting password (Called by resetPassword.js)
            // Find user by using the token passed as a parameter and making sure the expire token hasn't expired
            User.findOne({resetToken:req.body.token, expireToken:{$gt:Date.now()}})
            .then(user=>{
                if(!user){ // Expire token has expired
                    res.status(414).json({error:"Try again session expired"})
                }
                // Token is valid, has the password user entered and update their details
                bcrypt.hash(req.body.newPassword,10).then(hash=>{
                    user.password = hash
                    user.resetToken = undefined
                    user.expireToken = undefined
                    // Save user
                    user.save().then(()=>{
                        res.sendStatus(200) // Success
                    })
                })
            })
        } 
        else { // User is changing password (Called by changePassword.js)
            // Hash the password entered by user
            bcrypt.hash(req.body.newPassword, 10)
            .then((hash) => {
                // Find user by id and update their password
                User.findByIdAndUpdate(req.body.id, {$set: { password: hash }}, (err, data) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        res.sendStatus(200); // Success
                    }
                })
            }) 
        }
        
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})