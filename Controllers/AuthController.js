const UserModel = require('../Models/User.js');
const bcrypt = require('bcrypt');


module.exports = {
    Register: function(req, res) {
        const saltRounds = 10;
        const password = req.body.password;
        const email = req.body.email;
        const username = req.body.username;
        UserModel.exists({ username: username }, (err, exists) => {
            if (err) {
                res.status(500).send("An Error Acoured. Please try again later or contact the administrator with the error: " + err);
            } else if (exists) {
                res.status(400).send('Username already exists');
            } else {
                UserModel.exists({ email: email }, (err, exists) => {
                    if (err) {
                        res.status(500).send("An Error Acoured. Please try again later or contact the administrator with the error: " + err);
                    } else if (exists) {
                        res.status(400).send('Email already exists');
                    } else if (password.length < 8) {
                        res.status(400).send('Password must be at least 8 characters long');
                    } else {
                        bcrypt.hash(password, saltRounds, function(err, hash) {
                            if (err) {
                                console.log(err);
                            } else {
                                const user = new UserModel({
                                    username: username,
                                    password: hash,
                                    email: email,
                                    CreatedAt: Date.now()
                                });
                                user.save((err, user) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.redirect('/');
                                        console.log('User Created' + user);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    Login: function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                res.status(500).send("An Error Acoured. Please try again later or contact the administrator with the error: " + err);
            } else if (!user) {
                res.status(400).send('User does not exist');
            } else {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else if (result) {
                        console.log('User Logged In' + user);
                        res.redirect('/');
                    } else {
                        res.status(400).send('Password is incorrect');
                    }
                });
            }
        });
    },
    RenderLogin: function(req, res) {
        res.render('Login');
    },
    RenderRegister: function(req, res) {
        res.render('Register');
    }
}